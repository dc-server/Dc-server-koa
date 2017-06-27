const { makeExecutableSchema } = require('graphql-tools')
const isLength = require('validator/lib/isLength')
const db = require('../db')
const { hash, compare } =  require('../utils')
const { userSchema } = require('./user')
const { postSchema, postResolvers } = require('./post')
const { videoSchema, videoResolvers } = require('./video')

const rootSchema = [`
type Query {
  user(id: Int!): User
  post(id: Int!): Post
  posts(limit: Int, offset: Int): [Post]
  postsCount: Int!
  video(id: Int!): Video
  videos(limit: Int, offset: Int): [Video]
  videosCount: Int!
  userPosts(id: Int!): [Post]
  userVideos(id: Int!): [Video]
}

type Mutation {
  register(username: String!, password: String!, email: String): User
  login(username: String!, password: String!): User
}
`]

const rootResolvers = {
  Query: {
    user: (_, { id }, { user }) => user.load(id),
    post: (_, { id }, { post }) => post.load(id),
    video: (_, { id }, { video }) => video.load(id),
    posts: (_, { limit, offset }) => {
      const off = offset || 1
      const li = limit || 5
      return db.table('posts')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
    },
    videos: (_, { limit, offset }) => {
      const off = offset || 1
      const li = limit || 5
      return db.table('videos')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset)
    },
    postsCount: () => {
      return db.table('posts')
        .count()
        .then(x => x[0]['count(*)'])
    },
    videosCount: () => {
      return db.table('videos')
        .count()
        .then(x => x[0]['count(*)'])
    },
    userPosts: (_, { id }, { userPosts }) => userPosts.load(id),
    userVideos: (_, { id }, { userVideos }) => userVideos.load(id)
  },
  Mutation: {
    register: async(_, args, { user }) => {
      const { username, password } = args
      if (!isLength(username, { min: 4, max: 20 })){
        throw new Error(`username's length should in 4 ~ 20`)
      }
      if (!isLength(password, { min: 6, max: 20 })){
        throw new Error(`password's length should in 6 ~ 20`)
      }
      try {
        args.password = await hash(args.password)
      } catch (err) {
        throw err
      }
      const id = await db.table('users').insert(args).returning('id')
      return user.load(id[0])
    },
    login: async(_, { username, password }) => {
      const user = await db.table('users')
        .where('username', username)
        .select('*')
      if (user.length === 0) {
        throw new Error(`user not exists!`)
      }
      const res = await compare(password, user[0].password)
      if (!res) {
        throw new Error(`password not match!`)
      }
      return user[0]
    }
  }
}

const schema = [...rootSchema, ...userSchema, ...postSchema, ...videoSchema]
const resolvers = Object.assign({}, rootResolvers, postResolvers, videoResolvers)

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})
