import { test } from '@playwright/test';
import LoginPage from "../pages/LoginPage";
import ExcelUtil from "../utils/ExcelUtil"
import Allure from '../playwright/reporter/Allure';

const SHEET = "LoginTest";
let login: LoginPage;
test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    login = new LoginPage(page)
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_ValidLogin");
test(`${data1.TestID} - ${data1.Description}`, async () => {
    Allure.attachDetails(data1.Description, data1.Issue);
    await login.launchApplication();
    await login.login(data1.UserName, data1.Password);
    await login.logout();
});
