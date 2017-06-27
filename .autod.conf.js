module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test'
  ],
  dep: [
    'koa',
    'koa-bodyparser',
    'koa-compose',
    'koa-error',
    'koa-logger',
    'koa-router'
  ],
  devdep: [
  ],
  exclude: [
    './test/fixtures'
  ]
}
