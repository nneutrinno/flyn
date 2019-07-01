const fsReaddirRecursive = require("fs-readdir-recursive")
const path = require("path")
const { promises: fsPromise } = require("fs")
const _ = require("lodash")

module.exports = ({ path: folderPath = "/routes", logger = true }) => app => {

  const rootFolderPath = path.resolve(folderPath)

  const dir = fsReaddirRecursive(rootFolderPath)
  const toObject = path => {
    return {
      path
    }
  }
  const addFileName = require("./libs/addFileName")
  const addName = require("./libs/addName")
  const addMethod = require("./libs/addMethod")
  const addURL = require("./libs/addURL")
  const remove = require("./libs/remove")

  const routes = dir
    .map(toObject)
    .map(addFileName)
    .map(addName)
    .map(addMethod)
    .map(addURL)
    .map(remove(["fileName", "name"]))

  if (logger) console.log(routes)

  routes.forEach(route => {
    const join = path.join(rootFolderPath, route.path)

    const handler = require(join)(app)

    createRoute(app)({
      ...route,
      handler
    })
  })

  const jsonRoutes = JSON.stringify(routes.map(remove(["path"])), null, 2)

  function createRoute(app) {
    return config => {
      app[config.method.toLowerCase()](config.url, config.handler)
    }
  }
}
