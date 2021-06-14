export function random(max: number) {
  return Math.random() * max
}

export function randomInt(max: number, bound: boolean = false) {
  return bound ? Math.round(random(max)) : Math.floor(random(max))
}
