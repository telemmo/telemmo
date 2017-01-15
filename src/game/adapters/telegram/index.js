import {
  partial,
} from 'ramda'

import routes from './routes'

export default function start (dao, provider) {
  console.log('dao:', dao, 'provider:', provider)
  const subscriptions = routes.map(route =>
    provider
      .subscribe(route.match)
      .subscribe(partial(route.handler, [dao, provider])))

  return subscriptions
}

