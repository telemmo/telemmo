const expTable =
  Array.from({ length: 101 }).map((el, i) => 23 * i * i * i)

export function level (fighter) {
  return expTable
    .reduce((acc, lvlExp, lvl) => {
      if (fighter.exp > lvlExp) {
        return lvl
      }
      return acc
    }, 0)
}

