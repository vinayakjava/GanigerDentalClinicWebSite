import { expect, test, type Page } from "@playwright/test";
import { daysFromToday, nextWeekday } from "./helpers";

const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

function form(page: Page) {
  return {
    name: page.getByLabel("Full name"),
    phone: page.getByLabel("Mobile number"),
    branch: page.getByLabel("Preferred branch"),
    date: page.getByLabel(/Preferred date/),
    message: page.getByLabel(/Reason for visit/),
    consent: page.getByLabel(/may contact me/),
    submit: page.getByRole("button", { name: "Send request" }),
  };
}

test.beforeEach(async ({ page }) => {
  await page.goto("/en/contact");
});

test("says the form is a request, not a confirmed booking", async ({ page }) => {
  await expect(page.getByText("This is a request, not a confirmed booking.")).toBeVisible();
});

test("shows an error for every missing required field and focuses the first", async ({ page }) => {
  const f = form(page);
  await f.submit.click();

  await expect(page.getByText("Please correct the highlighted fields.")).toBeVisible();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter a valid 10-digit mobile number.")).toBeVisible();
  await expect(page.getByText("Please choose a branch.")).toBeVisible();
  await expect(page.getByText("Please tick this box so the clinic can contact you.")).toBeVisible();

  await expect(f.name).toBeFocused();
  await expect(f.name).toHaveAttribute("aria-invalid", "true");
  await expect(f.name).toHaveAccessibleDescription("Please enter your name.");
  await expect(f.date).not.toHaveAttribute("aria-invalid");
});

test("keeps what the patient typed when validation fails", async ({ page }) => {
  const f = form(page);
  await f.name.fill("Ramesh Patil");
  await f.phone.fill("12345");
  await f.branch.selectOption("athani");
  await f.message.fill("Tooth pain");
  await f.consent.check();
  await f.submit.click();

  await expect(page.getByText("Please enter a valid 10-digit mobile number.")).toBeVisible();
  await expect(f.phone).toBeFocused();
  await expect(f.name).toHaveValue("Ramesh Patil");
  await expect(f.phone).toHaveValue("12345");
  await expect(f.branch).toHaveValue("athani");
  await expect(f.message).toHaveValue("Tooth pain");
  await expect(f.consent).toBeChecked();
});

test("rejects a Sunday at Ainapur, which is closed on Sundays", async ({ page }) => {
  const f = form(page);
  const sunday = nextWeekday(0);
  await f.name.fill("Ramesh Patil");
  await f.phone.fill("9876543210");
  await f.branch.selectOption("ainapur");
  await f.date.fill(sunday);
  await f.submit.click();

  await expect(
    page.getByText("The selected branch is closed on that day. Please choose another date."),
  ).toBeVisible();
  await expect(f.date).toBeFocused();
});

test("rejects past dates and dates more than 90 days ahead", async ({ page }) => {
  const f = form(page);
  await f.date.fill(daysFromToday(-1));
  await f.submit.click();
  await expect(page.getByText("Please choose today or a future date.")).toBeVisible();

  await f.date.fill(daysFromToday(91));
  await f.submit.click();
  await expect(page.getByText("Please choose a date within the next 90 days.")).toBeVisible();
});

test("sends a valid request once and offers to send another", async ({ page }) => {
  const f = form(page);
  await f.name.fill("Playwright Test Patient");
  await f.phone.fill("+91 98765 43210");
  await f.branch.selectOption("athani");
  await f.date.fill(nextWeekday(3));
  await f.message.fill("Check-up (automated test)");
  await f.consent.check();

  const postRequest = page.waitForRequest((request) => request.method() === "POST");
  await f.submit.click();
  const body = (await postRequest).postData() ?? "";
  // The idempotency key must be set before the browser builds the form data.
  expect(body).toMatch(new RegExp(`name="(?:_\\d+_)?submissionId"\\r\\n\\r\\n${UUID.source}`, "i"));

  const heading = page.getByRole("heading", { name: "Request sent" });
  await expect(heading).toBeVisible();
  await expect(heading).toBeFocused();
  await expect(page.getByText(/This is not yet a confirmed booking/)).toBeVisible();

  const whatsapp = new URL(
    (await page.getByRole("link", { name: "Send details on WhatsApp" }).getAttribute("href")) ?? "",
  );
  expect(whatsapp.origin + whatsapp.pathname).toBe("https://wa.me/919611739915");
  const message = whatsapp.searchParams.get("text") ?? "";
  expect(message).toContain("Full name: Playwright Test Patient");
  expect(message).toContain("Mobile number: 9876543210");
  expect(message).toContain("Preferred branch: Athani Branch");
  expect(message).toContain("Reason for visit: Check-up (automated test)");

  await page.getByRole("button", { name: "Send another request" }).click();
  await expect(form(page).name).toHaveValue("");
  await expect(form(page).submit).toBeEnabled();
});

test("works in Kannada", async ({ page }) => {
  await page.goto("/kn/contact");
  await page.getByRole("button", { name: "ವಿನಂತಿ ಕಳುಹಿಸಿ" }).click();
  await expect(page.getByText("ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.")).toBeVisible();
  await expect(page.getByLabel("ಪೂರ್ಣ ಹೆಸರು")).toBeFocused();
});
