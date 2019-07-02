const fsReaddirRecursive = require("fs-readdir-recursive")
const path = require("path")
const { promises: fsPromise } = require("fs")
const _ = require("lodash")


const createRoute = require('./lib/createRoute')
const addFileName = require("./lib/addFileName")
const addName = require("./lib/addName")
const addMethod = require("./lib/addMethod")
const addURL = require("./lib/addURL")
const remove = require("./lib/remove")


module.exports = ({ path: folderPath = "./routes", logger = true, prefix = '' } = {}) => app => {

  const rootFolderPath = path.resolve(folderPath)

  const dir = fsReaddirRecursive(rootFolderPath)


  const toObject = path => {
    return {
      path
    }
  }
  

  const routes = dir
    .map(toObject)
    .map(addFileName)
    .map(addName)
    .map(addMethod)
    .map(addURL(prefix))
    .map(remove(["fileName", "name"]))

  if (logger) console.log(routes)

  routes.forEach(createRoute({ rootFolderPath, app }))

  const jsonRoutes = JSON.stringify(routes.map(remove(["path"])), null, 2)

  
}
