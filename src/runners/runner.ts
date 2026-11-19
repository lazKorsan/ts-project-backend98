import { spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

// Varsayılan tag. İsterseniz dosyayı değiştirmeden de verebilirsiniz:
//   npx ts-node TestRunner.ts @US011TC01_ATIN_get
const DEFAULT_TAG = "@US011TC01_ATIN_get";
const TAG = process.argv[2] ?? DEFAULT_TAG;

// Bu dosyanın bulunduğu klasörden yukarı çıkarak package.json'un olduğu proje kökünü bulur
function findProjectRoot(startDir: string): string {
    let current = startDir;
    while (!fs.existsSync(path.join(current, "package.json"))) {
        const parent = path.dirname(current);
        if (parent === current) {
            throw new Error(`package.json bulunamadı (başlangıç: ${startDir})`);
        }
        current = parent;
    }
    return current;
}

const rootDir = findProjectRoot(__dirname);

// shell: true -> Windows'ta npx.cmd'nin bulunması için gerekli.
// Tag, tek bir argüman olarak tırnaklanıyor.
const result = spawnSync("npx", ["cucumber-js", "--tags", `"${TAG}"`], {
    cwd: rootDir,
    stdio: "inherit",
    shell: true,
});

// Cucumber'ın çıkış kodunu aynen ilet (test kalırsa 1, geçerse 0)
process.exit(result.status ?? 1);