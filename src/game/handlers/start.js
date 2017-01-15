import { Observable } from 'rx'

export default function start (dao, provider, msg) {
  return provider.send(msg.from.id, msg.text)
}

