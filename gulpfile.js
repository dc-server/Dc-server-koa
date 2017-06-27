const gulp = require('gulp')
const { up, down, seed } = require('./db')

gulp.task('up', async() => {
  await up()
})

gulp.task('down', async() => {
  await down()
})

gulp.task('seed', async() => {
  await seed()
})

