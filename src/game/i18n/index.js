import fs from 'fs'
import printf from 'printf'
import Gettext from 'node-gettext'

const gettext = new Gettext()
const filter = /.po$/

function registerLanguage (file) {
  const lang = fs.basename(file).replace('.po', '')
  const content = fs.readFileSync(file)
  gettext.addTextDomain(lang, content)
}

fs.readdirSync(__dirname)
  .filter(entry => filter.test(entry))
  .forEach(registerLanguage)

function singular (lang) {
  return (msg, ...args) =>
    gettext.dngettext(lang, printf(msg, ...args))
}

function plural (lang) {
  return (sing, plur, ...args) =>
    gettext.dngettext(lang, sing, plur, ...args)
}

export default {
  singular,
  plural,
}

