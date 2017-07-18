const faker = require('faker')

exports.seed = async function (db) {
  const users = Array(20).fill().map(() => ({
    username: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    avatar_url: faker.internet.avatar()
  }))
  await Promise.all(users.map(user =>
    db.table('users').insert(user).returning('id')))

  const posts = Array(100).fill().map(() => Object.assign(
    {
      title: faker.lorem.sentence(faker.random.number({ min: 4, max: 7 }))
      .slice(0, -1).substr(0, 80),
      description: faker.lorem.words(20),
      content: faker.lorem.text(),
      author_id: faker.random.number({ min: 1, max: users.length })
    },
    (date => ({ created_at: date, updated_at: date }))(faker.date.past())
  ))
  await Promise.all(posts.map(post =>
    db.table('posts').insert(post).returning('id')
  ))

  const videos = Array(100).fill().map(() => Object.assign(
    {
      title: faker.lorem.sentence(faker.random.number({ min: 4, max: 7 }))
      .slice(0, -1).substr(0, 80),
      description: faker.lorem.words(20),
      link: faker.internet.url(),
      author_id: faker.random.number({ min: 1, max: users.length })
    },
    (date => ({ created_at: date, updated_at: date }))(faker.date.past())
  ))
  await Promise.all(videos.map(video =>
    db.table('videos').insert(video).returning('id')
  ))

  const imgs = Array(100).fill().map(() => Object.assign(
    {
      name: faker.lorem.sentence(faker.random.number({ min: 4, max: 7 }))
      .slice(0, -1).substr(0, 80),
      description: faker.lorem.words(20),
      link: faker.internet.url(),
      author_id: faker.random.number({ min: 1, max: users.length })
    },
    (date => ({ created_at: date, updated_at: date }))(faker.date.past())
  ))
  await Promise.all(imgs.map(img =>
    db.table('imgs').insert(img).returning('id')
  ))
}
