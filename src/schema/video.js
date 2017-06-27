exports.videoSchema = [`
type Video {
  id: Int!
  title: String!
  description: String
  link: String!
  created_at: String
  updated_at: String
  status: Int!
  author_id: Int!
  author: User!
}
`]

exports.videoResolvers = {
  Video: {
    author: ({ author_id }, _, { user }) => user.load(author_id)
  }
}
