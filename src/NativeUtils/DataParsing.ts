import { JSONPath } from "jsonpath-plus";
import assert from "node:assert/strict";

// ==========================================
// ID PARSING & ANALİZ METODLARI (JSONPath Odaklı)
// ==========================================

/**
 * Verilen JSON yanıtı içinden JSONPath ifadesi ile ID değerlerini bulur,
 * konsola listeler ve ID dizisini döner.
 *
 * @param responseData Ham JSON yanıtı (response.data)
 * @param jsonPathExpression Örn: "$.data[*].id" veya "$.AddedCourseID.webinars[*].id"
 */
export function native_analyzeAndPrintIDs(
    responseData: any,
    jsonPathExpression: string
): number[] {
    // JSONPath ile tüm ID'leri bul
    const result = JSONPath({
        path: jsonPathExpression,
        json: responseData,
        resultType: "value"
    }) as any[];

    const ids: number[] = result
        .map((v: any) => Number(v))
        .filter((n: number) => !isNaN(n));

    console.log("----------------------------------------");
    console.log(`📋 ID Listesi (${jsonPathExpression}):`);

    if (ids.length === 0) {
        console.log("⚠️  UYARI: Belirtilen JSONPath ifadesi ile ID bulunamadı!");
    } else {
        ids.forEach((id, index) => {
            console.log(`   [${index}] id: ${id}`);
        });
    }

    console.log("----------------------------------------");
    console.log(`🔢 Toplam ${ids.length} adet ID bulundu.`);

    return ids;
}

/**
 * Verilen JSON yanıtı içinden en büyük ID değerini bulur ve döner.
 * Örn: getMaxId(response.data, "$.data[*].id")
 */
export function native_getMaxId(
    responseData: any,
    jsonPathExpression: string
): number | null {
    const ids = extractIds(responseData, jsonPathExpression);

    if (ids.length === 0) {
        console.log(`⚠️  getMaxId: ID listesi boş, değer dönülemedi.`);
        return null;
    }

    const maxId = Math.max(...ids);
    console.log(`📈 Max ID (${jsonPathExpression}): ${maxId}`);
    return maxId;
}

/**
 * Verilen JSON yanıtı içinden en küçük ID değerini bulur ve döner.
 * Örn: getMinId(response.data, "$.data[*].id")
 */
export function native_getMinId(
    responseData: any,
    jsonPathExpression: string
): number | null {
    const ids = extractIds(responseData, jsonPathExpression);

    if (ids.length === 0) {
        console.log(`⚠️  getMinId: ID listesi boş, değer dönülemedi.`);
        return null;
    }

    const minId = Math.min(...ids);
    console.log(`📉 Min ID (${jsonPathExpression}): ${minId}`);
    return minId;
}

/**
 * Belirtilen JSONPath ifadesi ile ID listesini çıkarır.
 * İç içe geçmiş yapıları da destekler.
 * Örn: extractIds(response.data, "$.AddedCourseID.webinars[*].id")
 */
export function extractIds(
    responseData: any,
    jsonPathExpression: string
): number[] {
    // JSONPath ile direkt ID'leri çek
    const result = JSONPath({
        path: jsonPathExpression,
        json: responseData,
        resultType: "value"
    }) as any[];

    return result
        .map((v: any) => Number(v))
        .filter((n: number) => !isNaN(n));
}
// ==========================================
// ASSERTION (DOĞRULAMA) METODLARI
// ==========================================

/**
 * Gelen değerin beklenen değere eşit olup olmadığını kontrol eder (String).
 */
export function assertString(actual: any, expected: string, message?: string) {
    try {
        const actualStr = actual !== undefined && actual !== null ? String(actual) : actual;
        assert.strictEqual(actualStr, expected);
        console.log(`✅ [ASSERT PASS] String eşleşti: "${actualStr}"`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] String eşleşmedi! Beklenen: "${expected}", Gelen: "${actual}"`);
        throw new Error(message || `String doğrulama hatası: Beklenen "${expected}", Gelen "${actual}"`);
    }
}

/**
 * Gelen değerin beklenen değere eşit olup olmadığını kontrol eder (Number).
 */
export function assertNumber(actual: any, expected: number, message?: string) {
    try {
        const actualNum = typeof actual === 'string' ? Number(actual) : actual;
        assert.strictEqual(actualNum, expected);
        console.log(`✅ [ASSERT PASS] Number eşleşti: ${actualNum}`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] Number eşleşmedi! Beklenen: ${expected}, Gelen: ${actual}`);
        throw new Error(message || `Number doğrulama hatası: Beklenen ${expected}, Gelen ${actual}`);
    }
}

/**
 * HTTP Status Code'un beklenen koda eşit olup olmadığını kontrol eder.
 */
export function assertStatusCode(actualStatus: number, expectedStatus: number) {
    try {
        assert.strictEqual(actualStatus, expectedStatus);
        console.log(`✅ [ASSERT PASS] Status Code doğru: ${actualStatus}`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] Status Code hatalı! Beklenen: ${expectedStatus}, Gelen: ${actualStatus}`);
        throw new Error(`Status Code doğrulama hatası: Beklenen ${expectedStatus}, Gelen ${actualStatus}`);
    }
}

/**
 * Gelen değerin "true" veya "false" olup olmadığını kontrol eder (Boolean).
 */
export function assertBoolean(actual: any, expected: boolean) {
    try {
        const actualBool = typeof actual === 'string' ? actual.toLowerCase() === 'true' : Boolean(actual);
        assert.strictEqual(actualBool, expected);
        console.log(`✅ [ASSERT PASS] Boolean eşleşti: ${actualBool}`);
    } catch (error: any) {
        console.error(`❌ [ASSERT FAIL] Boolean eşleşmedi! Beklenen: ${expected}, Gelen: ${actual}`);
        throw new Error(`Boolean doğrulama hatası: Beklenen ${expected}, Gelen ${actual}`);
    }
}

/**
 * JSON yanıtındaki belirli bir key'in değerini beklenen değer ile karşılaştırır.
 */
export function assertJsonKeyValue(responseData: any, key: string, expectedValue: any) {
    try {
        const result = (JSONPath as any)({
            path: `$.${key}`,
            json: responseData,
            resultType: "value"
        }) as any[];

        const actualValue = result.length > 0 ? result[0] : undefined;
        const expected = expectedValue === "null" ? null : expectedValue;

        assert.strictEqual(actualValue, expected);
        console.log(`✅ [ASSERT PASS] JSON Key "${key}" doğru: ${actualValue === null ? 'null' : actualValue}`);
    } catch (error: any) {
        const result = (JSONPath as any)({ path: `$.${key}`, json: responseData, resultType: "value" }) as any[];
        const actualValue = result.length > 0 ? result[0] : undefined;

        console.error(`❌ [ASSERT FAIL] JSON Key "${key}" hatalı! Beklenen: ${expectedValue}, Gelen: ${actualValue}`);
        throw new Error(`JSON Key doğrulama hatası: "${key}" için beklenen ${expectedValue}, gelen ${actualValue}`);
    }
}

// ==========================================
// VERİ ÇEKME (EXTRACT) METODLARI
// ==========================================

/**
 * JSON yanıtı içinden belirli bir key'in değerini çeker ve döner (Doğrulama yapmaz).
 * Boşluklu key'leri ("Added Price Plans ID" gibi) destekler.
 */
export function extractJsonValue(responseData: any, key: string): any {
    if (!responseData) return undefined;

    if (responseData[key] !== undefined) {
        return responseData[key];
    }

    try {
        const result = (JSONPath as any)({
            path: `$.${key}`,
            json: responseData,
            resultType: "value"
        }) as any[];

        return result.length > 0 ? result[0] : undefined;
    } catch (e) {
        return undefined;
    }
}