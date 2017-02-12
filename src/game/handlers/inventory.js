import {
  partial,
  prop,
  head,
  map,
  filter,
  pipe,
  toPairs,
  tap,
} from 'ramda'

import { ObjectId } from 'mongodb'
import { capitalize } from './helpers'
import { rejectUndefined } from './errors'
import membersEquips from './membersEquips'
import models from '../models'

export default function call (dao, provider, _, msg) {
  console.log(msg)
  return dao.character
    .find({ playerId: msg.player.id })
    .then(map(pipe(prop('id'), ObjectId)))
    .then(partial(membersEquips, [dao]))
    .then(head)
    .then(rejectUndefined(msg, _('You don\'t have any equips yet.')))
    .then(prop('equips'))
    .then(filter(equip => equip !== null))
    .then(map(models.equips.find))
    .then(equips => dao.character
      .find({ _id: msg.player.currentCharId })
      .then(head)
      .then(char => ({
        equips,
        char,
      })),
    )
    .then(({ equips, char }) => ({
      to: msg.chat,
      text: [
        _('<pre>Equipped:</pre>\n%s\n\n',
          toPairs(char.equips)
            .map(pair =>
              `<b>${capitalize(pair[0])}:</b> ${models.equips.find(pair[1]).name}`,
            ).join('\n') || _('Nothing.'),
        ),
        _('<pre>Inventory:</pre>\n'),
        equips.map(equip =>
          [
            `<b>${equip.name}</b> - ${capitalize(equip.type)} tier ${equip.tier}`,
            // `<i>${equip.description}</i>`,
            `/use_equip_${equip.id}\n`,
          ].join('\n')
        ).join('\n'),
      ].join(''),
    }))
}

