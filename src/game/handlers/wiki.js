export default function call (dao, provider, _, msg) {
  const params = {
    to: msg.chat,
    text: _([
      _(':mortar_board: TeleMMO Wiki'),
      '',
      _('Find information on'),
      _('   :small_blue_diamond: Classes'),
      _('   :small_blue_diamond: Mechanics'),
      _('   :small_blue_diamond: Maps'),
      _('   :small_blue_diamond: Equipment'),
      '',
      _('and more, all at:'),
      _('reddit.com/r/telemmo/wiki'),
      '',
    ]),
  }

  return Promise.resolve(params)
}
