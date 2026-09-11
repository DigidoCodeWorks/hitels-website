// Temporary file for a one-off CI pipeline walkthrough — not used anywhere
// in the app. Safe to delete any time; it exists only to demonstrate what a
// failing `typecheck` check looks like in a PR before the fix commit lands.
const demoCount: number = "this is a string, not a number";

export function demoDoubled() {
  return demoCount * 2;
}
