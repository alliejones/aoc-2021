import { ScriptsConfiguration } from "https://deno.land/x/velociraptor@1.3.0/mod.ts";
import { expandGlobSync } from "https://deno.land/std@0.117.0/fs/expand_glob.ts";

const files = [
  ...expandGlobSync("day*/*.ts"),
  ...expandGlobSync("scripts/**/*.ts"),
];

const scripts: ScriptsConfiguration["scripts"] = {};
for (const file of files) {
  if (file.isFile) {
    if (file.name.endsWith("test.ts")) {
      scripts[file.name.replace(".ts", "")] = `deno test ${file.path}`;
    } else {
      scripts[file.name.replace(".ts", "")] = file.path;
    }
  }
}

export default <ScriptsConfiguration> {
  allow: ["read", "write", "net"],
  scripts,
};
