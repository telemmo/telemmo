import {
  splitEvery,
  prop,
} from 'ramda'

import models from '../models'

export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
    text: _(':world_map: Explore :world_map:\n\n*Choose a map to explore*'),
    options: splitEvery(2, models.maps.all.map(prop('name'))),
  }

  return Promise.resolve(params)
}

