import {

} from 'ramda'

const combat = {
}

function viewCombat (c) {
  const team0 = c.teams[0].overall
  const team1 = c.teams[1].overall
  const initiativeWinner = head(c.turns).initiative.overall.name
  const turns = tail(c.turns)

  const initiative = `${initiativeWinner} won the initiative!`
  const header = _(`%s vs. %s\n`, team0.name, team1.name)
  const view = header + initiative
  return view
}
