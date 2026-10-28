import type { AppointmentRequest } from "./appointment";
import type { BranchId } from "./clinic";
import type { Locale } from "./i18n";

const BRANCH_LABELS: Record<BranchId, string> = {
  athani: "Athani",
  ainapur: "Ainapur",
};

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: "English",
  kn: "Kannada",
};

export type AppointmentEmailMeta = { submissionId: string; locale: Locale; receivedAt: Date };

export function formatAppointmentEmail(request: AppointmentRequest, meta: AppointmentEmailMeta) {
  const received = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(meta.receivedAt);

  const preferredDate = request.preferredDate
    ? new Intl.DateTimeFormat("en-IN", {
        timeZone: "UTC",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(`${request.preferredDate}T00:00:00Z`))
    : "Not specified";

  const subject = `Appointment request – ${BRANCH_LABELS[request.branch]} – ${request.name}`;
  const text = [
    "New appointment REQUEST from the website. It is not confirmed until the clinic calls the patient.",
    "",
    `Name: ${request.name}`,
    `Mobile: +91 ${request.phone}`,
    `Branch: ${BRANCH_LABELS[request.branch]}`,
    `Preferred date: ${preferredDate}`,
    `Reason for visit: ${request.message ?? "Not given"}`,
    `Form language: ${LANGUAGE_LABELS[meta.locale]}`,
    `Received: ${received} IST`,
    `Reference: ${meta.submissionId}`,
    "",
    `Call: tel:+91${request.phone}`,
    `WhatsApp: https://wa.me/91${request.phone}`,
  ].join("\n");

  return { subject, text };
}
