const Koa = require('koa')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')
const Router = require('koa-router')
const static = require('koa-static')
const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')
const { apolloUploadKoa } = require('apollo-upload-server')
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

app.use(static('static'))

// app.use(bodyParser({
//   enableTypes: ['json', 'text', 'form'],
//   extendTypes: {
//     text: ['application/graphql']
//   }
// }))

const mws = [
  bodyParser({
    enableTypes: ['json', 'text', 'form'],
    extendTypes: {
      text: ['application/graphql'],
      json: ['application/json']
    }
  }),
  async (ctx, next) => {
    if (ctx.request.is('application/graphql')) {
      ctx.request.body = { query: ctx.request.body }
    }
    console.log(ctx.request.body)
    await next()
  },
  apolloUploadKoa({
    uploadDir: './static/imgs'
  })
]

router.post(
  '/graphql',
  ...mws,
  graphqlKoa({
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
  })
)

if (ENV !== 'prod') {
  router.get('/graphql', graphiqlKoa({ endpointURL: '/graphql' }))
}

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
