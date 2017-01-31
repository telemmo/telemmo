import {
  always,
  head,
} from 'ramda'

function resetStats (dao, char) {
  return dao.character
    .update({ _id: char.id }, { $set: {
      str: 5,
      ref: 5,
      acc: 5,
      con: 5,
      flow: 5,
    } })
}

export default function call (dao, provider, _, msg) {
  return dao.character.find({
    _id: msg.player.currentCharId,
  })
    .then(head)
    .then(char => resetStats(dao, char))
    .then(always({
      to: msg.chat,
      text: `Stats reseted!`,
    }))
}

