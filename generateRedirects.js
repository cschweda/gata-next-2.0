const routes = require('./routes')
const fs = require('fs')

//console.log(routes)
let contents = '/\t/index.html\t200\n'
routes.forEach(route => {
  if (route !== '/') {
    contents = contents + `${route}\t${route}/index.html\t200\n`
  }
})

try {
  fs.writeFileSync('./static/_redirects', contents)
} catch (err) {
  // An error occurred
  console.error(err)
}

console.log('_redirects generated')
