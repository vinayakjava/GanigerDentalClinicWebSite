import { describe, expect, it } from "vitest";
import {
  normalizeIndianMobile,
  todayInIndia,
  validateAppointment,
  type AppointmentInput,
} from "./appointment";
import { formatAppointmentEmail } from "./appointment-email";
import { allowRequest } from "./rate-limit";

// Wednesday 28 Oct 2026, 1:30 PM IST
const NOW = new Date("2026-10-28T08:00:00Z");

const valid: AppointmentInput = {
  name: "Ramesh Patil",
  phone: "9876543210",
  branch: "athani",
  preferredDate: "2026-10-30",
  message: "Tooth pain",
  consent: "on",
};

const errorsFor = (overrides: Partial<AppointmentInput>, now = NOW) => {
  const result = validateAppointment({ ...valid, ...overrides }, now);
  return result.ok ? {} : result.errors;
};

describe("normalizeIndianMobile", () => {
  it.each([
    ["9876543210", "9876543210"],
    ["+91 98765 43210", "9876543210"],
    ["91 98765-43210", "9876543210"],
    ["09876543210", "9876543210"],
    ["(987) 654-3210", "9876543210"],
  ])("accepts %s", (input, expected) => {
    expect(normalizeIndianMobile(input)).toBe(expected);
  });

  it.each(["", "12345", "5876543210", "98765432101", "+1 9876543210", "98765abcde"])("rejects %s", (input) => {
    expect(normalizeIndianMobile(input)).toBeNull();
  });
});

describe("todayInIndia", () => {
  it("uses the Indian calendar date, not UTC", () => {
    expect(todayInIndia(new Date("2026-10-27T19:00:00Z"))).toBe("2026-10-28");
    expect(todayInIndia(new Date("2026-10-28T18:29:00Z"))).toBe("2026-10-28");
  });
});

describe("validateAppointment", () => {
  it("accepts a complete request and normalizes it", () => {
    const result = validateAppointment({ ...valid, name: "  Ramesh Patil ", phone: "+91 98765 43210" }, NOW);
    expect(result).toEqual({
      ok: true,
      data: {
        name: "Ramesh Patil",
        phone: "9876543210",
        branch: "athani",
        preferredDate: "2026-10-30",
        message: "Tooth pain",
      },
    });
  });

  it("treats date and message as optional", () => {
    const result = validateAppointment({ ...valid, preferredDate: "", message: "  " }, NOW);
    expect(result.ok && result.data).toMatchObject({ preferredDate: undefined, message: undefined });
  });

  it("accepts Kannada names", () => {
    expect(errorsFor({ name: "ರಮೇಶ ಪಾಟೀಲ" })).toEqual({});
  });

  it("reports every invalid field with its own code", () => {
    expect(
      errorsFor({ name: "", phone: "123", branch: "belagavi", preferredDate: "31-10-2026", message: "x".repeat(501), consent: "" }),
    ).toEqual({
      name: "name_required",
      phone: "phone_invalid",
      branch: "branch_required",
      preferredDate: "date_invalid",
      message: "message_too_long",
      consent: "consent_required",
    });
  });

  it.each([["A"], ["x".repeat(81)], ["<script>"], ["Ramesh\nBcc: x@y.z"]])("rejects name %j", (name) => {
    expect(errorsFor({ name }).name).toBe("name_invalid");
  });

  it("rejects past dates using the Indian date", () => {
    expect(errorsFor({ preferredDate: "2026-10-27" }).preferredDate).toBe("date_past");
    expect(errorsFor({ preferredDate: "2026-10-28" })).toEqual({});
  });

  it("rejects dates more than 90 days ahead", () => {
    expect(errorsFor({ preferredDate: "2027-01-26" })).toEqual({});
    expect(errorsFor({ preferredDate: "2027-01-27" }).preferredDate).toBe("date_too_far");
  });

  it("rejects Sundays for Ainapur but not Athani", () => {
    expect(errorsFor({ branch: "ainapur", preferredDate: "2026-11-01" }).preferredDate).toBe("date_closed");
    expect(errorsFor({ branch: "athani", preferredDate: "2026-11-01" })).toEqual({});
    expect(errorsFor({ branch: "ainapur", preferredDate: "2026-11-02" })).toEqual({});
  });
});

describe("formatAppointmentEmail", () => {
  it("includes the request details and marks it as unconfirmed", () => {
    const { subject, text } = formatAppointmentEmail(
      { name: "Ramesh Patil", phone: "9876543210", branch: "ainapur", preferredDate: "2026-11-02" },
      { submissionId: "abc", locale: "kn", receivedAt: NOW },
    );
    expect(subject).toBe("Appointment request – Ainapur – Ramesh Patil");
    expect(text).toContain("not confirmed");
    expect(text).toContain("Mobile: +91 9876543210");
    expect(text).toContain("Preferred date: Monday, 2 November 2026");
    expect(text).toContain("Reason for visit: Not given");
    expect(text).toContain("Form language: Kannada");
    expect(text).toContain("Reference: abc");
  });
});

describe("allowRequest", () => {
  it("allows five requests per key per hour", () => {
    const key = "test-ip";
    const start = 1_000_000;
    for (let i = 0; i < 5; i++) expect(allowRequest(key, start + i)).toBe(true);
    expect(allowRequest(key, start + 10)).toBe(false);
    expect(allowRequest("other-ip", start + 10)).toBe(true);
    expect(allowRequest(key, start + 60 * 60 * 1000 + 1)).toBe(true);
  });
});
