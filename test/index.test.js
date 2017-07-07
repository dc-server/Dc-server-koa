const supertest = require('supertest')
const assert = require('power-assert')

const app = require('../src/app')
const request = supertest(app.listen())

describe('Graphql test', () => {
  it('should get user', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  user(id: 1) {
    id
    username
  }
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get user')
    const user = res.body.data.user
    assert.ok(user.id, 'should get user\'s id')
    assert.ok(user.username, 'should get user\'s username')
    assert.equal(user.status, undefined)
  })

  it('should get post', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  post(id: 1) {
    id
    title
    description
    content
    author_id
    author {
      id
    }
  }
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get post')
    const post = res.body.data.post
    assert.ok(post.id)
    assert.ok(post.content)
    assert.ok(post.description)
    assert.equal(post.author_id, post.author.id)
    assert.equal(post.status, undefined)
  })

  it('should get video', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  video(id: 1) {
    id
    title
    description
    link
    author_id
    author {
      id
    }
  }
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get video')
    const video = res.body.data.video
    assert.ok(video.id)
    assert.ok(video.link)
    assert.ok(video.description)
    assert.equal(video.author_id, video.author.id)
    assert.equal(video.status, undefined)
  })

  it('should get correct postsCount', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  postsCount
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get postsCount')
    assert.equal(res.body.data.postsCount, 100)
  })

  it('should get correct videosCount', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  videosCount
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get videosCount')
    assert.equal(res.body.data.videosCount, 100)
  })

  it('should get posts', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  posts(limit: 10, offset: 20) {
    id
  }
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get posts')
    const posts = res.body.data.posts
    assert.equal(posts.length, 10)
  })

  it('should get videos', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  videos(limit: 10, offset: 20) {
    id
  }
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get videos')
    const videos = res.body.data.videos
    assert.equal(videos.length, 10)
  })

  it('should get user\'s posts', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  userPosts(id: 1) {
    id
    author_id
  }
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get user\'s posts')
    const posts = res.body.data.userPosts
    posts.forEach((post, index) => {
      assert.equal(post.author_id, 1, `the post ${index} should belong to user 1`)
    })
  })

  it('should get user\'s videos', async () => {
    const res = await request
      .post('/graphql')
      .send({query: `
{
  userVideos(id: 1) {
    id
    author_id
  }
}
      `})
      .set('Accept', 'application/json')
      .expect(200)

    assert.ok(res, 'should get user\'s videos')
    const videos = res.body.data.userVideos
    videos.forEach((video, index) => {
      assert.equal(video.author_id, 1, `the video ${index} should belong to user 1`)
    })
  })

})
