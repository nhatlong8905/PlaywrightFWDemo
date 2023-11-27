import { Locator, Page } from "@playwright/test";

export default class UIElementActions {
  protected locator: Locator;
  protected selector: string;

  constructor(private page: Page) { }

  /**
   * Returns the first locator
   * @returns
   */
  public getLocator(): Locator {
    return this.locator.first();
  }

  /**
   * Returns the all the locators
   * @returns
   */
  public getLocators(): Locator {
    return this.locator;
  }

  /**
   * Sets the locator using the selector * 
   * @param selector 
   * @param description
   * @returns
   */
  public setElement(selector: string): UIElementActions {
    this.selector = selector;
    this.locator = this.page.locator(this.selector);
    return this;
  }

  /**
   * Sets the locator with description
   * @param locator
   * @param description
   * @returns
   */
  public setLocator(locator: Locator): UIElementActions {
    this.locator = locator;
    return this;
  }

  /**
   * Click on element
   * @returns
   */
  public async click() {
    await this.getLocator().click();
    return this;
  }

  /**
   * Double click on element
   * @returns
   */
  public async doubleClick() {
    await this.getLocator().dblclick();
    return this;
  }

  /**
   * scroll element into view, unless it is completely visible
   * @returns
   */
  public async scrollIntoView() {
    await this.getLocator().scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * Wait for element to be invisible
   * @returns
   */
  public async waitTillInvisible() {
    await this.getLocator().waitFor({ state: "hidden" });
    return this;
  }

  /**
   * wait for element not to be present in DOM
   * @returns
   */
  public async waitTillDetached() {
    await this.getLocator().waitFor({ state: "detached" });
    return this;
  }

  /**
   * wait for element to be visible
   * @param wait time for element is visible
   * @returns
   */
  public async waitTillVisible(sec: number) {
    await this.getLocator().waitFor({ state: "visible", timeout: sec * 1000 });
    return this;
  }

  /**
   * wait for element to be attached to DOM
   * @returns
   */
  public async waitForPresent() {
    await this.getLocator().waitFor({ state: "attached" });
    return this;
  }

  /**
   * This method hovers over the element
   */
  public async hover() {
    await this.getLocator().hover();
    return this;
  }

  /**
   * Returns input.value for <input> or <textarea> or <select> element.
   * @returns
   */
  public async getInputValue(): Promise<string> {
    let value: string;
    const element = this.getLocator();
    await element.waitFor();
    value = await element.inputValue();
    return value;
  }

  /**
   * Gets the text content
   * @returns
   */
  public async getTextContent(): Promise<string> {
    let content: string;
    const element = this.getLocator();
    await element.waitFor();
    content = (await element.textContent()).trim();
    return content;
  }

  /**
   * Get Attribute value
   * @param attributeName
   * @returns
   */
  public async getAttribute(attributeName: string): Promise<string> {
    let value: string;
    const element = this.getLocator();
    await element.waitFor();
    value = (await element.getAttribute(attributeName)).trim();
    return value;
  }

  /**
   * Get innerHTML
   * @returns
   */
  public async getInnerHTML(): Promise<string> {
    let text: string;
    const element = this.getLocator();
    await element.waitFor();
    text = (await element.innerHTML()).trim();
    return text;
  }

  /**
   * Get inner text
   * @returns
   */
  public async getInnerText(): Promise<string> {
    let text: string;
    const element = this.getLocator();
    await element.waitFor();
    text = (await element.innerText()).trim();
    return text;
  }

  /**
   * checks if element is editable
   * @returns Promise<boolean>
   */
  public async isEditable(): Promise<boolean> {
    let status: boolean;
    const element = this.getLocator();
    await element.waitFor();
    status = await element.isEditable();
    return status;
  }

  /**
   * checks if element is enabled
   * @returns Promise<boolean>
   */
  public async isEnabled(): Promise<boolean> {
    let status: boolean;
    const element = this.getLocator();
    await element.waitFor();
    status = await element.isEnabled();
    return status;
  }

  /**
   * checks if element is visible
   * @param wait time for element to be visible
   * @returns Promise<boolean>
   */
  public async isVisible(sec: number): Promise<boolean> {
    let visibility: boolean;
    try {
      visibility = await this.getLocator().isVisible({ timeout: sec * 1000 });
    } catch (error) {
      visibility = false;
    }
    return visibility;
  }

  /**
   * Press a key on web element
   * @param key
   */
  public async keyPress(key: string) {
    await this.getLocator().press(key);
  }

  /**
   * Get all the text Content
   * @returns
   */
  public async getAllTextContent(): Promise<string[]> {
    let content: string[];
    const element = this.getLocators();
    await element.first().waitFor();
    content = await element.allTextContents();
    return content;
  }

  /**
   * Get the count of
   * @returns
   */
  public async getCount(): Promise<number> {
    let count: number;
    count = await this.getLocators().count();
    return count;
  }
  /**
   * Performs mouse click action on the element
   * @returns 
   */
  public async mouseClick() {
    await this.getLocator().scrollIntoViewIfNeeded();
    const box = await this.getLocator().boundingBox();
    if (box != null) {
      await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }
    return this;
  }
  /**
   * Click on element using js
   * @returns
   */
  public async jsClick() {
    const ele = this.getLocator();
    await ele.waitFor();
    await ele.evaluate((node: HTMLElement) => { node.click(); });
    return this;
  }

  /**
   * get color of locator
   * @returns color
   */
  async getColor(locator: string, index: number = 0) {
    let element = this.page.locator(locator).nth(index);
    const actualColor = await element.evaluate(value => {
      return window.getComputedStyle(value).getPropertyValue("color")
    })
    return actualColor;
  }

  /**
   * get background color of locator
   * @returns background color
   */
  async getBackGroundColor(locator: string) {
    let element = this.page.locator(locator);
    const actualColor = await element.evaluate(value => {
      return window.getComputedStyle(value).getPropertyValue("background-color")
    })
    return actualColor;
  }
}
