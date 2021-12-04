import { join } from "https://deno.land/std/path/mod.ts";

export default async function readInput<T>(
  lineParser: (line: string) => T,
  filename: string,
): Promise<T[]> {
  const file = await Deno.readTextFile(join(Deno.cwd(), `${filename}.txt`));
  return file.toString().split("\n").filter((line) => line !== "").map((item) =>
    lineParser(item)
  );
}
