import { test, Locator } from "@playwright/test";

export default class CheckBoxActions {
  private locator: Locator;

  /**
   * Sets the locator with description
   * @param locator
   * @returns
   */
  public setLocator(locator: Locator): CheckBoxActions {
    this.locator = locator;
    return this;
  }

  /**
   * check checkbox or radio button
   */
  public async check() {
    await this.locator.check();
    return this;
  }

  /**
   * uncheck checkbox or radio button
   */
  public async uncheck() {
    await this.locator.uncheck();
    return this;
  }

  /**
   * Returns the status of the checkbox
   * @returns
   */
  public async isChecked(): Promise<boolean> {
    let status: boolean;
    const element = this.locator;
    await element.waitFor();
    status = await element.isChecked();
    return status;
  }
}
