import "server-only";
import { Resend } from "resend";
import type { AppointmentRequest } from "./appointment";
import { formatAppointmentEmail, type AppointmentEmailMeta } from "./appointment-email";

export async function sendAppointmentRequest(
  request: AppointmentRequest,
  meta: AppointmentEmailMeta,
): Promise<{ ok: boolean }> {
  const { subject, text } = formatAppointmentEmail(request, meta);

  // Local development and automated tests: print instead of sending. Never set this in production.
  if (process.env.APPOINTMENT_EMAIL_DRY_RUN === "true") {
    console.info(`[appointment] Dry run, email not sent.\n${subject}\n${text}`);
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.APPOINTMENT_EMAIL_FROM;
  const to = process.env.APPOINTMENT_EMAIL_TO;

  if (!apiKey || !from || !to) {
    console.error("[appointment] Email delivery is not configured", { submissionId: meta.submissionId });
    return { ok: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    { from, to: to.split(",").map((address) => address.trim()), subject, text },
    { idempotencyKey: `appointment-request/${meta.submissionId}` },
  );

  if (error) {
    console.error("[appointment] Email delivery failed", {
      submissionId: meta.submissionId,
      name: error.name,
      message: error.message,
    });
    return { ok: false };
  }
  return { ok: true };
}
