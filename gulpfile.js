const gulp = require('gulp')
const { up, down, seed } = require('./db')

gulp.task('up', async() => {
  await up()
  process.exit(0)
})

gulp.task('down', async() => {
  await down()
  process.exit(0)
})

gulp.task('seed', async() => {
  await seed()
  process.exit(0)
})

gulp.task('default', async() => {
  await down()
  await up()
  await seed()
  process.exit(0)
})

