export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
    text: _(':globe_with_meridians: TeleMMO version %s\nhttp://github.com/telemmo/telemmo', VERSION),
    options: [
      [_('/overworld')],
    ],
  }

  return Promise.resolve(params)
}

