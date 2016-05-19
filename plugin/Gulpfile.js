var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();


var config = {
      tmpDist: 'src/dist',
      dist: 'dist'
};

//define error function to be called with plumber
var onError = function (err) {
    console.log(err);
};

//compile sass
gulp.task('sass', function () {

  gulp.src('src/css/**/*.scss')
    .pipe(plugins.rubySass({
      style: 'compressed',
      check: true
    }))
    .pipe(plugins.minifyCss({keepSpecialComments: 0}))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(config.dist + '/css/'));
});

//concat, uglify and rename js files into one single file
gulp.task('js', function () {
  gulp.src([

    'src/js/*.js',
    'src/js/**/*.js'
  ])
    //uglify file
    .pipe(plugins.uglify({mangle: true}))
    //rename by adding ".min" to it
    .pipe(plugins.rename({suffix: '.min'}))
     //deploys to dist folder
    .pipe(gulp.dest(config.dist + '/js/'));    
});


//watch change in files
gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
});


//gulp.task('build', ['fonts', 'js_desktop', 'Sass']);
gulp.task('default', [ 'js', 'sass']);

gulp.task('build', ['js', 'sass'], function () {
  return gulp.src('dist/**/*').pipe(gulp.size({title: 'build', gzip: true}));
});
