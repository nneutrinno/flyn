# Flyn

Flyn is a multi framework package that makes easier to create routes for controllers.

## Install

### [NPM](http://npmjs.org/)
- Use: `require('flyn')`
- Install: `npm install --save flyn`

### [YARN](https://yarnpkg.com/)
- Use: `require('flyn')`
- Install: `yarn add flyn`

## Usage

### Example

``` javascript
const app = require('express')()

flyn({
  path: './routes', // default
  logger: true // default
})(app)

app.listen(process.env.PORT, () => {
  console.log(
    'Server running on', 
    process.env.PORT
  )
})

```

### Endpoint file example

```js
// ./routes/GET.status.js

module.exports = app => (req, res) => {

  return res.send({
    success: 1
  })
}
```

### Another endpoint file example
```js
// ./routes/POST.user.js

module.exports = app => (req, res) => {

  console.log('User created with success')

  return res.send({
    success: 1
  })
}
```

## Compatibility

### Now
 - Express
 - Fastify
 - Hapi
 
### Soon
 - Koa
 - NestJs

## License

Licensed under [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT license](http://opensource.org/licenses/MIT)

