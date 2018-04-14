'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const eslint = require('gulp-eslint')
const seq = require('run-sequence')

gulp.task('nodemon', () => {
  nodemon({
    script: 'src/index.js',
    ext: 'js',
    ignore: ['node_modules/**']
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files)
  })
})

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('watch', () => {
  gulp.watch([ '!node_modules/', 'src/**/*.js' ], [ 'lint' ])
})

gulp.task('default', (cb) => {
  seq('nodemon', 'lint', cb)
})
