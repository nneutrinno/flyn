const frameworkIdentifier = require('framework-identifier')
const path = require("path")



const createRoute = ({ rootFolderPath, app }) => route => {
  const rootWithRoutePath = path.join(rootFolderPath, route.path)
  const creator = require(`./lib/${frameworkIdentifier(app)}`)

  return creator(app)({
    ...route,
    handler: require(rootWithRoutePath)(app)
  })
}


module.exports = createRoute