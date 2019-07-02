const express = app => config => {
  return app[config.method.toLowerCase()](config.url, config.handler)
}

module.exports = express