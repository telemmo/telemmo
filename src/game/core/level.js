const expTable = Array.from({ length: 100 })
  .map((el, i) => 20 * i * i * i)

export default function (fighter) {
  return expTable
    .reverse()
    .find(lvl => fighter.exp > lvl)
}
