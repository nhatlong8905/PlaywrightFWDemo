import { Locator } from "@playwright/test";
import HTMLConstants from "../../constants/HTMLConstants";

export default class DropDownActions {
  private locator: Locator;

  /**
   * Sets the locator with description
   * @param locator
   * @returns
   */
  public setLocator(locator: Locator): DropDownActions {
    this.locator = locator;
    return this;
  }

  /**
   * Select the dropdown by value
   * @param value
   * @returns
   */
  public async selectByValue(value: string) {
    await this.locator.selectOption({ value });
    return this;
  }

  /**
   * Select the dropdown by Label
   * @param text
   * @returns
   */
  public async selectByVisibleText(text: string) {
    await this.locator.selectOption({ label: text });
    return this;
  }

  /**
   * Select the dropdown by index
   * @param index
   * @returns
   */
  public async selectByIndex(index: number) {
    await this.locator.selectOption({ index });
    return this;
  }

  /**
   * Gets all the options in dropdown
   * @param index
   * @returns
   */
  public async getAllOptions(): Promise<string[]> {
    let selectOptions: string[];
    selectOptions = await this.locator.locator(HTMLConstants.OPTION).allTextContents();
    return selectOptions;
  }

  /**
   * Gets all the selected options in dropdown
   * @param index
   * @returns
   */
  public async getAllSelectedOptions(): Promise<string[]> {
    let selectOptions: string[];
    selectOptions = await this.locator
          .locator(HTMLConstants.SELECTED_OPTION)
          .allTextContents();
    return selectOptions;
  }
}
