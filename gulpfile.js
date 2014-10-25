/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-plumber del --save-dev
 */
 

// Load plugins
var gulp =          	require('gulp'),
	autoprefixer = 		require('gulp-autoprefixer'),
	imagemin = 			require('gulp-imagemin'),
	jshint = 			require('gulp-jshint'),
	minifycss = 		require('gulp-minify-css'),
	notify = 			require('gulp-notify'),
	plumber =			require('gulp-plumber'),
	rename = 			require('gulp-rename'),
	sass = 				require('gulp-ruby-sass'),
	uglify = 			require('gulp-uglify'),
	del = 				require('del');
		

// Clean CSS files
gulp.task('clean', function(cb) {
    del(['css/'], cb)
});


// Handle SASS/CSS compiling
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

    // Compiling
	return gulp.src('sass/style.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({ 
			lineNumbers : true,
        }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('css'))
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

 
// Watch Files
gulp.task('watch', function() {
 
	// Watch .scss files
	gulp.watch('sass/**/*.scss', ['styles']); 
});


// Default task
gulp.task('default', ['watch'], function() {
    gulp.start('clean', 'styles');
});

