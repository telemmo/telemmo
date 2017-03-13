export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
    text: _([
      _(':globe_with_meridians: TeleMMO version %s', VERSION),
      '',
      _('Github:'),
      _('github.com/telemmo/telemmo'),
      '',
      _('Reddit:'),
      _('reddit.com/r/telemmo'),
      '',
      _('Telegram: @telemmo'),
    ].join('\n')),
  }

  return Promise.resolve(params)
}

