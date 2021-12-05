import { path } from "../deps.ts";

export default async function readInput<T>(
  lineParser: (line: string) => T,
  filename: string,
): Promise<T[]> {
  const file = await Deno.readTextFile(
    path.join(Deno.cwd(), `${filename}.txt`),
  );
  return file.toString().split("\n").filter((line) => line !== "").map((item) =>
    lineParser(item)
  );
}
