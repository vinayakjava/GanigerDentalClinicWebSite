import { expect, test } from "@playwright/test";
import { navigation } from "./helpers";

test.describe("locale routing", () => {
  test("redirects paths without a locale to English", async ({ request }) => {
    for (const [from, to] of [
      ["/", "/en"],
      ["/about", "/en/about"],
      ["/services", "/en/services"],
    ]) {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status(), from).toBe(307);
      expect(new URL(response.headers().location, "http://localhost").pathname, from).toBe(to);
    }
  });

  test("redirects Kannada-language browsers to Kannada", async ({ request }) => {
    const response = await request.get("/", {
      maxRedirects: 0,
      headers: { "Accept-Language": "kn-IN,kn;q=0.9,en;q=0.8" },
    });
    expect(new URL(response.headers().location, "http://localhost").pathname).toBe("/kn");
  });

  test("shows a 404 page for unknown paths", async ({ page }) => {
    const response = await page.goto("/en/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
    await page.getByRole("link", { name: "Go to the home page" }).click();
    await expect(page).toHaveURL(/\/en$/);
  });
});

const PAGES = [
  { path: "", en: "Dr. Ganiger's Multispeciality Dental Clinic & Implant Center", kn: "ಡಾ॥ ಗಾಣಿಗೇರ ಮಲ್ಟಿಸ್ಪೆಷಾಲಿಟಿ ಡೆಂಟಲ್ ಕ್ಲಿನಿಕ್ ಮತ್ತು ಇಂಪ್ಲಾಂಟ್ ಸೆಂಟರ್" },
  { path: "/about", en: "About the Doctor", kn: "ವೈದ್ಯರ ಬಗ್ಗೆ" },
  { path: "/services", en: "Dental Treatments & Facilities", kn: "ಹಲ್ಲಿನ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಸೌಲಭ್ಯಗಳು" },
  { path: "/contact", en: "Contact & Appointments", kn: "ಸಂಪರ್ಕ ಮತ್ತು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್" },
  { path: "/privacy", en: "Privacy Notice", kn: "ಗೌಪ್ಯತಾ ಸೂಚನೆ" },
  { path: "/terms", en: "Terms of Use", kn: "ಬಳಕೆಯ ನಿಯಮಗಳು" },
];

test.describe("pages", () => {
  for (const locale of ["en", "kn"] as const) {
    for (const { path, ...headings } of PAGES) {
      test(`/${locale}${path} renders without errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text());
        });

        const response = await page.goto(`/${locale}${path}`);
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(headings[locale]);
        await expect(page).toHaveTitle(/.+/);
        expect(errors).toEqual([]);
      });
    }
  }

  test("lists all 19 treatments", async ({ page }) => {
    await page.goto("/en/services");
    await expect(page.getByRole("main").getByRole("listitem")).toHaveCount(19);
  });

  test("never shows a horizontal scrollbar", async ({ page }) => {
    for (const path of ["/en", "/kn", "/kn/contact", "/kn/services"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
});

test.describe("header", () => {
  test("navigates between pages and marks the current one", async ({ page }) => {
    await page.goto("/en");
    let nav = await navigation(page);
    await nav.getByRole("link", { name: "Treatments" }).click();
    await expect(page).toHaveURL(/\/en\/services$/);

    nav = await navigation(page);
    await expect(nav.getByRole("link", { name: "Treatments" })).toHaveAttribute("aria-current", "page");
    await nav.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/en\/contact$/);
    // The mobile menu must close after navigating.
    await expect(page.locator("details[open]")).toHaveCount(0);
  });

  test("switches language on the same page", async ({ page }) => {
    await page.goto("/en/services");
    await page.getByRole("link", { name: /View this page in Kannada/ }).click();
    await expect(page).toHaveURL(/\/kn\/services$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "kn");

    await page.getByRole("link", { name: /ಈ ಪುಟವನ್ನು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ನೋಡಿ/ }).click();
    await expect(page).toHaveURL(/\/en\/services$/);
  });

  test("has working call, WhatsApp and directions links", async ({ page }) => {
    await page.goto("/en/contact");
    const main = page.getByRole("main");
    await expect(main.locator('a[href="tel:+919448932092"]').first()).toBeVisible();
    await expect(main.locator('a[href="tel:+919611739915"]').first()).toBeVisible();
    await expect(main.locator('a[href^="https://wa.me/919448932092"]').first()).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    await expect(main.getByRole("link", { name: /Get directions/ })).toHaveCount(2);
  });

  test("skip link moves focus to the main content", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard navigation is a desktop concern");
    await page.goto("/en");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });
});
