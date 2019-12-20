const config = require('./config')
const routes = []
const siteArray = Object.getOwnPropertyNames(config.siteConfig)
const base = process.env.NODE_ENV === 'development' ? '' : `test`

siteArray.forEach(section => {
  try {
    let json = require(`./api/${section}.json`)
    let sectionPaths = json.map(section => {
      return `${section.path}`
    })
    routes.push(...sectionPaths)
  } catch (e) {
    console.log(`ERROR: ${e}`)
  }
})
module.exports = routes
