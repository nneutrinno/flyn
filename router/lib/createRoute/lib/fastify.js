const fastify = app => config => {
  return app.route(config)
}

module.exports = fastify