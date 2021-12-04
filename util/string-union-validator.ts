export default function makeStringUnionValidator<T>(
  values: readonly T[],
  errorMsg = "Invalid value",
) {
  // deno-lint-ignore no-explicit-any
  const guard = (input: any): input is T => values.includes(input);
  // deno-lint-ignore no-explicit-any
  return function (value: any) {
    if (guard(value)) {
      return value;
    } else {
      throw new Error(`${errorMsg}: ${value}`);
    }
  };
}
