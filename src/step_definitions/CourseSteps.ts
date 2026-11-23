import {DataTable, Given} from "@cucumber/cucumber";
import {Template} from "../../Template";
import axios, {Method} from "axios";
import assert from "node:assert/strict";


Given(/^Course kullanicisi "([^"]*)" token ile baseUrl olusturur$/, async function (userType: string) {
    this.token = (Template as any)[userType];
    this.url = Template.baseUrl;
});
Given(/^Course kullanicisi "([^"]*)" path parametrelerini olusturur$/, async function (path: string) {

    let finalPath = path;

    if (path.includes("minID")) {
        if (!this.minID) {
            throw new Error("HATA: minID henüz hesaplanmamış! Önce ID hesaplama adımını çalıştırın.");
        }
        finalPath = finalPath.replace("minID", this.minID.toString());
    }

    if (path.includes("maxID")) {
        if (!this.maxID) {
            throw new Error("HATA: maxID henüz hesaplanmamış! Önce ID hesaplama adımını çalıştırın.");
        }
        finalPath = finalPath.replace("maxID", this.maxID.toString());
    }

    if (path.includes("nonExistingID")) {
        if (!this.nonExistingID) {
            throw new Error("HATA: nonExistingID henüz hesaplanmamış! Önce ID hesaplama adımını çalıştırın.");
        }
        finalPath = finalPath.replace("nonExistingID", this.nonExistingID.toString());
    }


    const baseUrl = this.url || Template.baseUrl;
    this.rawPath = `${baseUrl}/${finalPath}`;
    console.log("Oluşturulan URL:", this.rawPath);
});
Given(/^Courses kullanicisi "([^"]*)" sorgusu gonderir$/, async function (httpMethod: string) {
    this.response = await axios.request({
        method: 'get',
        url: this.rawPath,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 1234,
            'Authorization': this.token
        },
        validateStatus: (status) => status < 500
    });
    console.log(this.response.data);
});
Given(/^Courses kullanicisi "([^"]*)" bilgisinin "([^"]*)" oldugunu dogrular$/, async function (path: string, expectedValue: string) {
    const actualValue = path.split('.').reduce((obj, key) => obj?.[key], this.response.data);

    assert.strictEqual(
        String(actualValue),
        expectedValue,
        `Beklenen degerler esit degil! Alan: ${path}, Beklenen: ${expectedValue}, Gelen: ${actualValue}`
    );
});
Given(/^Courses kullanicisi "([^"]*)" degerinin (\d+) oldugunu dogrular$/, async function (actualValue: string, expectedValue: number) {
    assert.strictEqual(this.response.data[actualValue], 200, 'Beklenen degerler esit degil');
});
Given(/^Courses kullanicisi idList console yazdirir$/, async function () {
    const idList = await this.response.data.AddedCourseID.webinars.map((item: { id: any; }) => item.id);
    console.dir(idList);
});
Given(/^Course kullanicisi "([^"]*)" degerini console yazdirir$/, async function (idType: string) {
    const idList = await this.response.data.AddedCourseID.webinars.map((item: { id: any; }) => item.id);
    let resultId: number;
    if (idType === "minID") {
        resultId = Math.min(...idList);
        console.log(`📌 Min ID değeri: ${resultId}`);
        this.minID = resultId;

    } else if (idType === "maxID") {
        resultId = Math.max(...idList);
        console.log(`📌 Max ID değeri: ${resultId}`);
        this.maxID = resultId;
    } else if (idType === "nonExistingID") {
        resultId = Math.max(...idList) + 5;
        this.nonExistingID = resultId;
    } else {
        throw new Error(`Geçersiz ID tipi: ${idType}`);
    }

    this.selectedCourseId = resultId;
    console.dir(resultId);
});
Given(/^Course kullanicisi asagidaki bilgilerle "(POST|PATCH|PUT)" sorgusu gonderir$/, async function (httpMethod: string, dataTable: DataTable) {
    // Feature dosyasındaki tabloyu otomatik JSON objesine çevirir
    const requestBody = dataTable.rowsHash();

    this.response = await axios.request({
        method: httpMethod.toLowerCase() as Method,
        url: this.rawPath,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 1234,
            'Authorization': this.token
        },
        data: requestBody,
        validateStatus: (status) => status < 500
    });
    console.log(`[${httpMethod}] Request Body:`, requestBody);
    console.log(`[${httpMethod}] Response:`, this.response.data);
});
Given(/^Yetkisiz Course kullanicisi statusCode degerinin (\d+) oldugunu dogrular$/, async function (code:number) {

    assert.strictEqual(this.response.status, code);

});
Given(/^Yetkisiz Course kullanicisi "([^"]*)" bilgisinin "([^"]*)" oldugunu dogrular$/, async function (actualValue: string, expectedValue: string) {

    assert.strictEqual(this.response.data[actualValue], expectedValue);
});