import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

const day = Deno.args[0];
const dayDir = `day${day.padStart(2, "0")}`;

try {
  await Deno.stat(dayDir);
  console.error("Directory already exists.");
} catch (error) {
  if (error && error.name === "NotFound") {
    await ensureDir(dayDir);
    await Deno.writeTextFile(`./${dayDir}/input.txt`, "");
    await Deno.writeTextFile(`./${dayDir}/example.txt`, "");
    await Deno.writeTextFile(`./${dayDir}/${dayDir}.ts`, "");
    await Deno.writeTextFile(`./${dayDir}/${dayDir}-1.ts`, "");
  }
}
