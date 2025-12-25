import { expect } from "@playwright/test";

class LoginPage {
  constructor(page) {
    (this.page = page),
      (this.email = "#email"),
      (this.password = "#password"),
      (this.loginButton = "//button[@class='btn w-100 btn-primary']"),
      (this.header = "//h4[normalize-space()='Dashboard Login']");
  }

  async loginToApplication(email, pass) {
    await this.page.fill(this.email, email);

    await this.page.fill(this.password, pass);

    await this.page.click(this.loginButton);
  }

  async verifingToLogout() {
    await expect(this.page.locator(this.header)).toBeVisible();
  }
}

module.exports = LoginPage;
