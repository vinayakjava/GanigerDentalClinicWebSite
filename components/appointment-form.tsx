"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitAppointment, type AppointmentFormState } from "@/app/[lang]/contact/actions";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { AppointmentField } from "@/lib/appointment";
import { BRANCH_IDS, PRIMARY_PHONE, telHref, whatsappHref, type BranchId } from "@/lib/clinic";
import type { Locale } from "@/lib/i18n";

type Props = {
  labels: Dictionary["form"];
  branchNames: Record<BranchId, string>;
  callLabel: string;
  locale: Locale;
};

const FIELD_ORDER: AppointmentField[] = ["name", "phone", "branch", "preferredDate", "message", "consent"];

export function AppointmentForm(props: Props) {
  const [attempt, setAttempt] = useState(0);
  return <AppointmentFormBody key={attempt} {...props} onReset={() => setAttempt((n) => n + 1)} />;
}

function AppointmentFormBody({ labels, branchNames, callLabel, locale, onReset }: Props & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState<AppointmentFormState, FormData>(submitAppointment, {
    status: "idle",
  });
  const submissionId = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") statusRef.current?.focus();
    if (state.status === "invalid") {
      const first = FIELD_ORDER.find((field) => state.errors[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-green-700/30 bg-green-50 p-6">
        <h3 ref={successRef} tabIndex={-1} className="text-xl font-bold text-green-900 outline-none">
          {labels.successHeading}
        </h3>
        <p className="mt-2 text-ink">{labels.successBody}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-lg bg-navy-900 px-4 font-semibold text-white hover:bg-navy-700"
          >
            {labels.successWhatsapp}
          </a>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center rounded-lg border-2 border-navy-900 px-4 font-semibold text-navy-900 hover:bg-brand-50"
          >
            {labels.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  const describedBy = (field: AppointmentField, hasHint = false) =>
    [hasHint ? `${field}-hint` : null, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") ||
    undefined;

  const errorText = (field: AppointmentField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1 text-sm font-semibold text-red-700">
        {labels.errors[errors[field]!]}
      </p>
    ) : null;

  const inputClass = (field: AppointmentField) =>
    `mt-1 block w-full rounded-lg border bg-white px-3 py-2.5 text-base text-ink ${
      errors[field] ? "border-red-700 ring-1 ring-red-700" : "border-line"
    }`;

  return (
    <form
      // Remount when the server returns new values: React's automatic form reset would otherwise
      // clear the <select>, whose default changes in the same commit.
      key={JSON.stringify(values ?? {})}
      ref={formRef}
      action={formAction}
      noValidate
      onSubmit={(event) => {
        submissionId.current ??= crypto.randomUUID();
        const input = event.currentTarget.elements.namedItem("submissionId") as HTMLInputElement;
        input.value = submissionId.current;
      }}
      className="space-y-5"
    >
      <div ref={statusRef} tabIndex={-1} role="alert" className="outline-none">
        {state.status === "invalid" && (
          <p className="rounded-lg bg-red-50 p-3 font-semibold text-red-800">{labels.errorSummary}</p>
        )}
        {state.status === "error" && (
          <div className="rounded-lg bg-red-50 p-3 text-red-800">
            <p className="font-semibold">
              {state.reason === "rate_limited" ? labels.errorRateLimited : labels.errorDelivery}
            </p>
            <p className="mt-2 flex flex-wrap gap-3">
              <a className="font-semibold underline" href={telHref(PRIMARY_PHONE)}>
                {callLabel} {PRIMARY_PHONE}
              </a>
              <a className="font-semibold underline" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                {labels.successWhatsapp}
              </a>
            </p>
          </div>
        )}
      </div>

      <input type="hidden" name="submissionId" defaultValue="" />
      <input type="hidden" name="locale" value={locale} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="font-semibold text-navy-900">
          {labels.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          defaultValue={values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          className={inputClass("name")}
        />
        {errorText("name")}
      </div>

      <div>
        <label htmlFor="phone" className="font-semibold text-navy-900">
          {labels.phone}
        </label>
        <p id="phone-hint" className="text-sm text-muted">
          {labels.phoneHint}
        </p>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          required
          maxLength={16}
          defaultValue={values?.phone}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={describedBy("phone", true)}
          className={inputClass("phone")}
        />
        {errorText("phone")}
      </div>

      <div>
        <label htmlFor="branch" className="font-semibold text-navy-900">
          {labels.branch}
        </label>
        <select
          id="branch"
          name="branch"
          required
          defaultValue={values?.branch ?? ""}
          aria-invalid={errors.branch ? true : undefined}
          aria-describedby={describedBy("branch")}
          className={inputClass("branch")}
        >
          <option value="" disabled>
            {labels.branchPlaceholder}
          </option>
          {BRANCH_IDS.map((id) => (
            <option key={id} value={id}>
              {branchNames[id]}
            </option>
          ))}
        </select>
        {errorText("branch")}
      </div>

      <div>
        <label htmlFor="preferredDate" className="font-semibold text-navy-900">
          {labels.date} <span className="font-normal text-muted">({labels.optional})</span>
        </label>
        <p id="preferredDate-hint" className="text-sm text-muted">
          {labels.dateHint}
        </p>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          defaultValue={values?.preferredDate}
          aria-invalid={errors.preferredDate ? true : undefined}
          aria-describedby={describedBy("preferredDate", true)}
          className={inputClass("preferredDate")}
        />
        {errorText("preferredDate")}
      </div>

      <div>
        <label htmlFor="message" className="font-semibold text-navy-900">
          {labels.message} <span className="font-normal text-muted">({labels.optional})</span>
        </label>
        <p id="message-hint" className="text-sm text-muted">
          {labels.messageHint}
        </p>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={500}
          defaultValue={values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", true)}
          className={inputClass("message")}
        />
        {errorText("message")}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            defaultChecked={values?.consent === "on"}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy("consent")}
            className="mt-1 h-5 w-5 shrink-0 accent-navy-900"
          />
          <label htmlFor="consent" className="text-ink">
            {labels.consent}
          </label>
        </div>
        {errorText("consent")}
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent-500 px-6 text-lg font-bold text-navy-950 hover:bg-accent-500/90 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
