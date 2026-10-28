import { z } from "zod";
import { BRANCH_CLOSED_WEEKDAYS, BRANCH_IDS, type BranchId } from "./clinic";

export const MAX_DAYS_AHEAD = 90;
export const MAX_MESSAGE_LENGTH = 500;

export type AppointmentField = "name" | "phone" | "branch" | "preferredDate" | "message" | "consent";

export type FieldErrorCode =
  | "name_required"
  | "name_invalid"
  | "phone_invalid"
  | "branch_required"
  | "date_invalid"
  | "date_past"
  | "date_too_far"
  | "date_closed"
  | "message_too_long"
  | "consent_required";

export type AppointmentInput = Record<AppointmentField, string>;

export type AppointmentRequest = {
  name: string;
  phone: string;
  branch: BranchId;
  preferredDate?: string;
  message?: string;
};

export type ValidationResult =
  | { ok: true; data: AppointmentRequest }
  | { ok: false; errors: Partial<Record<AppointmentField, FieldErrorCode>> };

// Letters and combining marks from any script (Kannada vowel signs are marks), plus space . ' -
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;

export function normalizeIndianMobile(raw: string): string | null {
  const compact = raw.replace(/[\s\-()]/g, "");
  const match = compact.match(/^(?:\+91|91|0)?([6-9]\d{9})$/);
  return match ? match[1] : null;
}

export function todayInIndia(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function weekdayOf(isoDate: string): number {
  return new Date(`${isoDate}T00:00:00Z`).getUTCDay();
}

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "name_required" })
    .min(2, { error: "name_invalid" })
    .max(80, { error: "name_invalid" })
    .regex(NAME_PATTERN, { error: "name_invalid" }),
  phone: z.string().transform((value, ctx) => {
    const normalized = normalizeIndianMobile(value);
    if (!normalized) {
      ctx.addIssue({ code: "custom", message: "phone_invalid" });
      return z.NEVER;
    }
    return normalized;
  }),
  branch: z.enum(BRANCH_IDS, { error: "branch_required" }),
  preferredDate: z.union([z.literal(""), z.iso.date({ error: "date_invalid" })]),
  message: z.string().trim().max(MAX_MESSAGE_LENGTH, { error: "message_too_long" }),
  consent: z.literal("on", { error: "consent_required" }),
});

export function validateAppointment(input: AppointmentInput, now: Date): ValidationResult {
  const parsed = schema.safeParse(input);
  const errors: Partial<Record<AppointmentField, FieldErrorCode>> = {};

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as AppointmentField;
      errors[field] ??= issue.message as FieldErrorCode;
    }
  }

  const date = input.preferredDate.trim();
  if (!errors.preferredDate && date) {
    const today = todayInIndia(now);
    if (date < today) errors.preferredDate = "date_past";
    else if (date > addDays(today, MAX_DAYS_AHEAD)) errors.preferredDate = "date_too_far";
    else if (
      !errors.branch &&
      (BRANCH_CLOSED_WEEKDAYS[input.branch as BranchId] ?? []).includes(weekdayOf(date))
    ) {
      errors.preferredDate = "date_closed";
    }
  }

  if (!parsed.success || Object.keys(errors).length > 0) return { ok: false, errors };

  const { name, phone, branch, preferredDate, message } = parsed.data;
  return {
    ok: true,
    data: {
      name,
      phone,
      branch,
      preferredDate: preferredDate || undefined,
      message: message || undefined,
    },
  };
}
