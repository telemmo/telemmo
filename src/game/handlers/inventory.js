import {
  propEq,
  join,
  equals,
  find,
  findIndex,
  groupBy,
  sortBy,
  partial,
  prop,
  head,
  map,
  filter,
  pipe,
  toPairs,
} from 'ramda'

import { ObjectId } from 'mongodb'
import { capitalize } from './helpers'
import { rejectUndefined } from './errors'
import membersEquips from './membersEquips'
import models from '../models'

export default function call (dao, provider, _, msg) {
  console.log(msg)

  const invSectionOrder = ['weapon', 'set', 'token']

  const equipVerbs = [
    { type: 'weapon', verb: 'wield' },
    { type: 'set', verb: 'wear' },
    { type: 'token', verb: 'empower' },
  ]

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
      text: join('', [
        _('<pre>Equipped:</pre>\n%s\n\n',
          toPairs(char.equips)
            .map(pair =>
              `<b>${capitalize(pair[0])}:</b> ${models.equips.find(pair[1]).name}`,
            ).join('\n') || _('Nothing.'),
        ),

        join('\n\n', map(({ 0: equipType, 1: equipList }) =>
          join('\n', [
            _(`<pre>${capitalize(equipType)}:</pre>`),
            ...map(({ id, name, tier, type }) =>
                _('<b>%s</b> - Tier %s %s\n/%s_%s',
                  name, tier, capitalize(type),
                  prop('verb', find(propEq('type', type), equipVerbs)),
                  id,
                ),
              sortBy(prop('tier'), equipList),
            ),
          ]),
          sortBy(
            ({ 0: equipType }) => findIndex(equals(equipType), invSectionOrder),
            toPairs(groupBy(prop('type'), equips)),
          ),
        )),

      ]),
    }))
}
