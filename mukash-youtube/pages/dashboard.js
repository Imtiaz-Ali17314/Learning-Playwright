import { expect } from "@playwright/test";
class DashboardPage {
  constructor(page) {
    (this.page = page),
      (this.profile = "img[alt='profile']"),
      (this.logout = "//span[normalize-space()='Log Out']");
  }

  async logoutFromApplication() {
    await this.page.click(this.profile);

    await this.page.click(this.logout);
  }

  async verfingTologin() {
    await this.page.waitForSelector(this.profile, { state: "visible" });
    await expect(this.page.locator(this.profile)).toBeVisible();
  }
}

module.exports = DashboardPage;
