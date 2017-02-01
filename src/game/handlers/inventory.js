import {
  partial,
  prop,
  head,
  map,
  pipe,
  toPairs,
  tap,
} from 'ramda'

import { ObjectId } from 'mongodb'
import { capitalize } from './helpers'
import membersEquips from './membersEquips'
import models from '../models'

export default function call (dao, provider, _, msg) {
  return dao.character
    .find({ playerId: msg.player.id })
    .then(map(pipe(prop('id'), ObjectId)))
    .then(partial(membersEquips, [dao]))
    .then(head)
    .then(prop('equips'))
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
        _('Equiped:\n%s\n',
          toPairs(tap(console.log, char.equips)).map(pair =>
            `<b>${capitalize(pair[0])}:</b> ${models.equips.find(pair[1]).name}\n`,
          ).join('') || _('Nothing.'),
        ),
        _('Inventory:\n'),
        equips.map(equip =>
          `${equip.name} - <i>${capitalize(equip.type)}</i>\n /use_equip_${equip.id}\n`,
        ).join('\n'),
      ].join(''),
    }))
}

