import { Locator } from "@playwright/test";
import UIElementActions from "./UIElementActions";

export default class EditBoxActions extends UIElementActions {
  /**
   * Sets the selector with description
   * @param selector
   * @returns
   */
  public setEditBox(selector: string): EditBoxActions {
    this.setElement(selector);
    return this;
  }

  /**
   * Sets the locator with description
   * @param locator
   * @returns
   */
  public setLocator(locator: Locator): EditBoxActions {
    super.setLocator(locator);
    return this;
  }

  /**
   * Clear and enter text
   * @param value
   * @returns
   */
  public async fill(value: string) {
    await this.getLocator().fill(value);
    return this;
  }

  /**
   * Types the value to text field
   * @param value
   * @returns
   */
  public async type(value: string) {
    await this.getLocator().type(value);
    return this;
  }

  /**
   * Enter text and hit tab key
   * @param value
   * @returns
   */
  public async fillAndTab(value: string) {
    await this.getLocator().fill(value);
    await this.getLocator().press("Tab");
    return this;
  }

  /**
   * Typing text and hit tab key
   * @param value
   * @returns
   */
  public async typeAndTab(value: string) {
    await this.getLocator().type(value);
    await this.getLocator().press("Tab");
    return this;
  }
}
