import { randomArrayIndex } from "./arrays";

export function randomState() {
  const states = ["Gilgit Baltistan", "Punjab", "KPK", "Sindh", "Blochistan"];
  return randomArrayIndex(states);
}
