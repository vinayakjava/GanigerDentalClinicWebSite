import type { AppointmentRequest } from "./appointment";
import type { Locale } from "./i18n";

export type AppointmentWhatsappLabels = {
  intro: string;
  name: string;
  phone: string;
  branch: string;
  date: string;
  message: string;
};

// Message the patient sends to the clinic's WhatsApp, prefilled in their form language.
export function formatAppointmentWhatsapp(
  request: AppointmentRequest,
  branchName: string,
  labels: AppointmentWhatsappLabels,
  locale: Locale,
) {
  const preferredDate = request.preferredDate
    ? new Intl.DateTimeFormat(`${locale}-IN`, {
        timeZone: "UTC",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(`${request.preferredDate}T00:00:00Z`))
    : null;

  const details = [
    `${labels.name}: ${request.name}`,
    `${labels.phone}: ${request.phone}`,
    `${labels.branch}: ${branchName}`,
    preferredDate && `${labels.date}: ${preferredDate}`,
    request.message && `${labels.message}: ${request.message}`,
  ].filter(Boolean);

  return [labels.intro, "", ...details].join("\n");
}
