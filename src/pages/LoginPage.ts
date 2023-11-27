import { test, Page } from "@playwright/test";
import UIActions from "../playwright/actions/UIActions";
import CommonConstants from "../constants/CommonConstants";

export default class LoginPage {
    private ui: UIActions;

    readonly email_field = '[data-cucumber="input-login-email"]';
    readonly password_field = '[data-cucumber="input-login-password"]';
    readonly continue_btn = '[data-cucumber="button-continue"]';
    readonly sign_in_btn = '[data-cucumber="button-login"]';
    readonly avatar = '[data-cucumber="user-avatar"]';
    readonly btn_logout = 'input[name="commit"]';

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    public async launchApplication() {
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(`${process.env.BASE_URL}`);
        });
    }
    /**
     * Log into the application
     * @param userName 
     * @param password 
     */
    public async login(userName: string, password: string) {
        await test.step(`Login to application credentials as ${userName} & ${password}`, async () => {
            await this.ui.editBox(this.email_field).fill(userName);
            await this.ui.element(this.continue_btn).click();
            await this.ui.editBox(this.password_field).fill(password);
            await this.ui.element(this.sign_in_btn).click();
        });        
 
    }

    /**
     * Log out of the application
     */
    public async logout() {
        await test.step(`Logged out of application`, async () => {
            await this.ui.element(this.avatar).click();
            await this.ui.element(this.btn_logout).click();
            await this.ui.pauseInSecs(CommonConstants.TWO);
        });
    }
}