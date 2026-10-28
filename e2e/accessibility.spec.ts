import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PATHS = ["", "/about", "/services", "/contact", "/privacy", "/terms", "/missing-page"];

for (const locale of ["en", "kn"]) {
  for (const path of PATHS) {
    test(`/${locale}${path} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
      await page.goto(`/${locale}${path}`);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });
  }
}

test("form errors are announced and pass axe", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText("Please correct the highlighted fields.")).toBeVisible();
  const results = await new AxeBuilder({ page }).include("form").withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
