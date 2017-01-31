import {
  splitEvery,
  prop,
} from 'ramda'

import models from '../models'

function options () {
  return models.maps.all.map(map => `/explore_${map.id}`)
    .concat(':arrow_left: /overworld')
}

export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
    text: _(':earth_asia: Explore :earth_asia:\n\nChoose a map to explore'),
    options: splitEvery(2, options()),
  }

  return Promise.resolve(params)
}

