import { cp, copyFile, mkdir, rm } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectDirectory = dirname(fileURLToPath(import.meta.url));
const outputDirectory = resolve(projectDirectory, "../dist");

if (
    dirname(outputDirectory) !== resolve(projectDirectory, "..") ||
    basename(outputDirectory) !== "dist"
) {
    throw new Error("Refusing to build outside the project dist directory.");
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const fileName of ["index.html", "script.js", "style.css"]) {
    await copyFile(
        resolve(projectDirectory, "../", fileName),
        resolve(outputDirectory, fileName),
    );
}

await cp(
    resolve(projectDirectory, "../public"),
    resolve(outputDirectory, "public"),
    { recursive: true },
);