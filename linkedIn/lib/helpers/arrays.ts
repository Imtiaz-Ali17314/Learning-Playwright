export function randomArrayIndex(array: string[]) {
  const randonIndex = Math.floor(Math.random() * array.length);
  return array[randonIndex];
}
