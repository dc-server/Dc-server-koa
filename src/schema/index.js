const { makeExecutableSchema } = require('graphql-tools')
const db = require('../db')
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
  }
}

const schema = [...rootSchema, ...userSchema, ...postSchema, ...videoSchema]
const resolvers = Object.assign({}, rootResolvers, postResolvers, videoResolvers)

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
})
