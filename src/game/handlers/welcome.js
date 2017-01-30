import {
  splitEvery,
  map,
  pipe,
} from 'ramda'

import models from '../models'

const buildKeyboard = pipe(
  map(clas => `${clas.emoji} /info_${clas.id}`),
  splitEvery(1),
)

export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
    text: _(':globe_with_meridians: Welcome to TeleMMO! :globe_with_meridians:\n\n You will now create your first character. Touch the comands below to see information about a class.'),
    options: buildKeyboard(models.classes.all),
  }

  return Promise.resolve(params)
}

