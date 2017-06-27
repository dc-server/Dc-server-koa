const Koa = require('koa')
const errorHandler = require('koa-error')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')
const schema = require('./schema')
const { user, post, video, userPosts, userVideos } = require('./dataloader')

const app = new Koa()
const router = new Router()

app.use(errorHandler())
if (process.env.NODE_ENV !== 'test') {
  app.use(logger())
}
app.use(bodyParser())
router.post('/graphql', graphqlKoa({
  schema,
  context: {
    user,
    post,
    video,
    userPosts,
    userVideos
  }
}))
router.get('/graphql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
