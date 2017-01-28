import {
  splitEvery,
  prop,
} from 'ramda'

import models from '../models'

function options () {
  return models.maps.all.map(map => `/explore_${map.id}`)
}

export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
    text: _(':world_map: Explore :world_map:\n\n*Choose a map to explore*'),
    options: splitEvery(2, options()),
  }

  return Promise.resolve(params)
}

