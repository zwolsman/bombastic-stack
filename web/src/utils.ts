export function reward(
  moves: number,
  stake: number,
  tiles: number = 25,
  bombs: number = 3,
  snitching: number = 0.005
) {
  let odds = (tiles - moves) / (tiles - moves - bombs);
  odds *= 1 - snitching;

  return Math.floor(stake * odds);
}

export function random(min = 0, max = 10): number {
  return Math.floor(Math.random() * max + min);
}
