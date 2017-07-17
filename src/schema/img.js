exports.imgSchema = [`
type Img {
  id: Int!
  name: String!
  description: String
  created_at: String
  updated_at: String
  status: Int!
  author_id: Int!
  author: User!
}

input Upload {
  name: String!
  type: String!
  size: Int!
  path: String!
}
`]

exports.imgResolvers = {
  Img: {
    author: ({ author_id }, _, { user }) => user.load(author_id)
  }
}
