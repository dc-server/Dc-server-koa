exports.postSchema = [`
type Post {
  id: Int!
  title: String!
  description: String
  content: String!
  created_at: String
  updated_at: String
  status: Int!
  author_id: Int!
  author: User!
}
`]

exports.postResolvers = {
  Post: {
    author: ({ author_id }, _, { user }) => user.load(author_id)
  }
}
