"use server";

import { headers } from "next/headers";
import {
  validateAppointment,
  type AppointmentField,
  type AppointmentInput,
  type AppointmentRequest,
  type FieldErrorCode,
} from "@/lib/appointment";
import { sendAppointmentRequest } from "@/lib/email";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { allowRequest } from "@/lib/rate-limit";

export type AppointmentFormState =
  | { status: "idle" }
  // `request` is absent only for the honeypot's fake success.
  | { status: "success"; request?: AppointmentRequest }
  | { status: "invalid"; errors: Partial<Record<AppointmentField, FieldErrorCode>>; values: AppointmentInput }
  | { status: "error"; reason: "delivery" | "rate_limited"; values: AppointmentInput; request: AppointmentRequest };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function submitAppointment(
  _previous: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const field = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  // Honeypot: hidden from people, often filled in by bots. Pretend success so bots don't retry.
  if (field("website")) return { status: "success" };

  const values: AppointmentInput = {
    name: field("name"),
    phone: field("phone"),
    branch: field("branch"),
    preferredDate: field("preferredDate"),
    message: field("message"),
    consent: field("consent"),
  };

  const result = validateAppointment(values, new Date());
  if (!result.ok) return { status: "invalid", errors: result.errors, values };

  // Generated in the browser so retries of the same submission share one idempotency key.
  const providedId = field("submissionId");
  const submissionId = UUID_PATTERN.test(providedId) ? providedId : crypto.randomUUID();

  const forwardedFor = (await headers()).get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim() || "unknown";
  if (!allowRequest(clientIp)) return { status: "error", reason: "rate_limited", values, request: result.data };

  const localeValue = field("locale");
  const locale = isLocale(localeValue) ? localeValue : DEFAULT_LOCALE;
  const delivery = await sendAppointmentRequest(result.data, {
    submissionId,
    locale,
    receivedAt: new Date(),
  });

  return delivery.ok
    ? { status: "success", request: result.data }
    : { status: "error", reason: "delivery", values, request: result.data };
}
