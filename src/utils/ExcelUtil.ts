import excelToJson from "convert-excel-to-json";
import ExcelConstants from "../constants/ExcelConstants";

export default class ExcelUtil {
    public static getTestDataArray(sheet: string) {
        const result = excelToJson({
            sourceFile: ExcelConstants.TEST_PATH,
            columnToKey: {
                '*': '{{columnHeader}}',
            },
            sheetStubs: true,
            header: { rows: 1 },
            sheets: [sheet],
        });
        return result[sheet];
    }

    public static getTestData(sheet: string, testID: string) {
        const testData = this.getTestDataArray(sheet);
        let found = false;
        let data;
        for (let i = 0; i < testData.length; i++) {
            if (testData[i].TestID === testID) {
                data = testData[i];
                found = true;
            }
        }
        if (!found) {
            throw new Error(`Test '${testID}' was not found on '${sheet}' sheet`);
        }
        return data;
    }
}
