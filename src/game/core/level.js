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

export function test () {
  const player = { exp: 0 }
  let y = 0
  let z = 0

  function progressTest (untilLvl, expPerCombat) {
    y = 0
    while (level(player) < untilLvl) {
      player.exp += expPerCombat
      y += 1
      z += 1
    }
    console.log(
      `to level ${untilLvl} getting ${expPerCombat}exp each kill:`,
      '\n-combats:',
      y,
      '\n-minutes:',
      (y * 50) / 60,
      '\n-hours:',
      ((y * 50) / 60) / 60,
      '\n-days:',
      ((y * 50) / 60) / 60 / 24,
      '\n\n',
    )
  }

  progressTest(5, 5)
  progressTest(10, 10)
  progressTest(15, 15)
  progressTest(20, 20)
  progressTest(25, 25)
  progressTest(30, 30)
  progressTest(35, 35)
  progressTest(40, 40)
  progressTest(45, 45)
  progressTest(50, 50)
  progressTest(55, 55)
  progressTest(60, 60)
  progressTest(65, 65)
  progressTest(70, 70)
  progressTest(75, 75)
  progressTest(80, 80)
  progressTest(85, 85)
  progressTest(90, 90)
  progressTest(95, 95)
  progressTest(100, 100)

  console.log(
    `total:`,
    '\n-combats:',
    z,
    '\n-minutes:',
    (z * 50) / 60,
    '\n-hours:',
    ((z * 50) / 60) / 60,
    '\n-days:',
    ((z * 50) / 60) / 60 / 24,
    '\n\n',
  )
}

