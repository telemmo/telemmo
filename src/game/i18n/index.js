import fs from 'fs'
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

export default gettext.dngettext.bind(gettext)

