// utils/TestRunner.ts
// bu method ortak kullanım bunun içinde değişklik ypamıyoruz.
// native testleri yakalayıp loglama işlemini goruyor.
import assert from 'assert';

export class TestRunner {
    /**
     * Testlerin try-catch bloklarına boğulmadan çalışmasını sağlar.
     * Hataları yakalar ve konsola anlaşılır şekilde basar.
     */
    static async run(testName: string, testLogic: () => Promise<void>): Promise<void> {
        console.log(`\n🚀 [BAŞLADI] ${testName}`);
        try {
            await testLogic();
            console.log(`✅ [BAŞARILI] ${testName}\n`);
        } catch (error: any) {
            console.error(`❌ [BAŞARISIZ] ${testName}`);

            // Hatanın Assertion (doğrulama) hatası mı yoksa API hatası mı olduğunu ayırt et
            if (error instanceof assert.AssertionError) {
                console.error(`   -> Doğrulama Hatası: ${error.message}`);
            } else if (error.response) {
                console.error(`   -> API Hatası (Status: ${error.response.status})`);
                console.error(`   -> Detay: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error(`   -> Beklenmeyen Hata: ${error.message}`);
            }
            // Testin başarısız olduğunu sistemin anlaması için hatayı yukarı fırlatıyoruz
            process.exitCode = 1;
        }
    }
}