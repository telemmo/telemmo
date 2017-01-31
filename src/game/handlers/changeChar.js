import { capitalize } from './helpers'

export default function call (dao, provider, _, msg) {
  return dao.character
    .find({ playerId: msg.player.id })
    .then(chars => ({
      to: msg.chat,
      text: chars.map(char =>
        `${char.name} - ${capitalize(char.classId)} - /use_char_${char.id}`,
      ).join('\n'),
    }))
}

