const Dataloader = require('dataloader')
const db = require('./db')

function assignType(obj, type) {
  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
  obj.__type = type;
  return obj;
}

function mapTo(keys, keyFn, type, rows) {
  if (!rows) return mapTo.bind(null, keys, keyFn, type);
  const group = new Map(keys.map(key => [key, null]));
  rows.forEach(row => group.set(keyFn(row), assignType(row, type)));
  return Array.from(group.values());
}

function mapToMany(keys, keyFn, type, rows) {
  if (!rows) return mapToMany.bind(null, keys, keyFn, type);
  const group = new Map(keys.map(key => [key, []]));
  rows.forEach(row => group.get(keyFn(row)).push(assignType(row, type)));
  return Array.from(group.values());
}

const user = new Dataloader(ids => db.table('users')
  .whereIn('id', ids)
  .select('*')
  .then(mapTo(ids, x => x.id, 'User'))
)

const post = new Dataloader(ids => db.table('posts')
  .whereIn('id', ids)
  .select('*')
  .then(mapTo(ids, x => x.id, 'Post'))
)

const video = new Dataloader(ids => db.table('videos')
  .whereIn('id', ids)
  .select('*')
  .then(mapTo(ids, x => x.id, 'Video'))
)

const img = new Dataloader(ids => db.table('imgs')
  .whereIn('id', ids)
  .select('*')
  .then(mapTo(ids, x => x.id, 'Img'))
)

const userPosts = new Dataloader(ids => db.table('posts')
  .whereIn('author_id', ids)
  .select('*')
  .then(mapToMany(ids, x => x.author_id, 'Post'))
)

const userVideos = new Dataloader(ids => db.table('videos')
  .whereIn('author_id', ids)
  .select('*')
  .then(mapToMany(ids, x => x.author_id, 'Video'))
)

const userImgs = new Dataloader(ids => db.table('imgs')
  .whereIn('author_id', ids)
  .select('*')
  .then(mapToMany(ids, x => x.author_id, 'Img'))
)

module.exports = {
  user,
  post,
  video,
  img,
  userPosts,
  userVideos,
  userImgs
}
