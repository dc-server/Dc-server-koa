const Koa = require('koa')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const Router = require('koa-router')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')
const schema = require('./schema')
const { user, post, video, img, userPosts, userVideos, userImgs } = require('./dataloader')

const ENV = process.env.NODE_ENV
const app = new Koa()
const router = new Router()

app.use(cors())
onerror(app)
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
    img,
    userPosts,
    userVideos,
    userImgs
  }
}))

if (ENV !== 'prod') {
  router.get('/graphql', graphiqlKoa({ endpointURL: '/graphql' }))
}

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
