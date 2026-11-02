import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const appRoot = join(process.cwd(), "app");
const allowedFiles = new Set(["routes/design-lab.tsx", "styles/tokens.css", "root.tsx"]);

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

describe("design token guard", () => {
  it("keeps raw hex colors out of production app files", () => {
    const offenders = walk(appRoot)
      .filter((file) => /\.(ts|tsx|css)$/.test(file))
      .filter((file) => !allowedFiles.has(relative(appRoot, file)))
      .filter((file) => /#[0-9a-fA-F]{3,8}\b/.test(readFileSync(file, "utf8")))
      .map((file) => relative(appRoot, file));

    expect(offenders).toEqual([]);
  });
});
