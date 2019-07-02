const hapi = app => config => {
  const { url: path, handler, method, ...other } = config

  return app.route({ ...other, method, path, handler })
}

module.exports = hapi