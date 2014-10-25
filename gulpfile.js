/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
 

// Load plugins
var gulp =          require('gulp'),
	sass = 			require('gulp-sass'),
	autoprefixer = 	require('gulp-autoprefixer'),
	minifycss = 	require('gulp-minify-css'),
	rename = 		require('gulp-rename'),
	notify = 		require('gulp-notify'),
	plumber =		require('gulp-plumber'),
	del = 			require('del');
	// jshint = require('gulp-jshint'),
	// uglify = require('gulp-uglify'),
	// imagemin = require('gulp-imagemin'),
	// concat = require('gulp-concat'),
	// livereload = require('gulp-livereload'),
		

// Clean CSS files
gulp.task('clean', function(cb) {
    del(['css/'], cb)
});


// Neighbourhood Forum Styles
gulp.task('styles', function() 
{
	// Defining error handling
	var onError = function(err) {
        notify.onError({
            title:    "SASS compile failed",
            //subtitle: 'failure',
            message:  "Error: <%= error.message %> ",
            sound:    "Beep"
        })(err);

        this.emit('end');
    };


	return gulp.src('sass/style.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('css'))
		//.pipe(notify({ message: 'Finished compiling SASS' }));
		.pipe(notify({ // Add gulpif here
           title: 'SASS compile Success!',
           //subtitle: 'Compiled SASS',
           message: '',
           sound: "Pop"
       }));
});

 
// Watch
gulp.task('watch', function() {
 
	// Watch .scss files
	gulp.watch('sass/**/*.scss', ['styles']);
 
	// Watch .js files
	// gulp.watch('src/scripts/**/*.js', ['scripts']);
 
	// Watch image files
	// gulp.watch('src/images/**/*', ['images']);
 
	// Create LiveReload server
	// livereload.listen();
 
	// Watch any files in dist/, reload on change
	// gulp.watch(['dist/**']).on('change', livereload.changed); 
});


// Default task
gulp.task('default', ['watch'], function() {
    gulp.start('clean', 'styles');
});

