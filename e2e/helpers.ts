import type { Page } from "@playwright/test";

function todayInIndia(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** First date after today (Indian calendar) that falls on the given weekday, 0 = Sunday. */
export function nextWeekday(weekday: number): string {
  const date = new Date(`${todayInIndia()}T00:00:00Z`);
  do {
    date.setUTCDate(date.getUTCDate() + 1);
  } while (date.getUTCDay() !== weekday);
  return date.toISOString().slice(0, 10);
}

export function daysFromToday(days: number): string {
  const date = new Date(`${todayInIndia()}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** On narrow screens the navigation sits behind the menu button. */
export async function navigation(page: Page) {
  const menuButton = page.locator("summary", { hasText: /Menu|ಮೆನು/ });
  if (await menuButton.isVisible()) {
    await menuButton.click();
    return page.locator("details nav");
  }
  return page.locator("header nav").first();
}
