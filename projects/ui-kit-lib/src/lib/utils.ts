export function moveArrayElement(
  array: unknown[],
  from: number,
  to: number,
  on = 1
) {
  return array.splice(to, 0, ...array.splice(from, on));
}

export function copyObj(object: object) {
  return JSON.parse(JSON.stringify(object));
}
