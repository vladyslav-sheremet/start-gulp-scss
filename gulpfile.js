var gulp = require('gulp'),
	 scss = require('gulp-sass'),
	 browserSync = require('browser-sync').create(),
	 concat = require('gulp-concat'),
	 uglifyjs = require('gulp-uglifyjs'),
	 cssnano = require('gulp-cssnano'),
	 rename = require('gulp-rename'),
	 autoprefixer = require('gulp-autoprefixer');

gulp.task('script', function(){
	return gulp.src(['',
						''])
		.pipe(concat('libs.min.js'))
		.pipe(uglifyjs())
		.pipe(gulp.dest('app/js'))
});

gulp.task('js', function(){
	return gulp.src(['app/js/main.js'])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglifyjs())
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scss', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(scss({ outputStyle: 'expanded' }))
		.pipe(autoprefixer({
			overrideBrowserlist: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest('app/css'))

		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('build', function(done){
	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src(['app/js/*.js', '!app/js/main.js'])
		.pipe(gulp.dest('dist/js'))

	var buildCss = gulp.src(['app/css/*.css', '!app/css/libs.css', '!app/css/main.css'])
		.pipe(gulp.dest('dist/css'))

	var buildCss = gulp.src('app/img/**/*.*')
		.pipe(gulp.dest('dist/img'))

	done();
});

gulp.task('watch', function(done){
	browserSync.init({
		server: "app/"
	});

	gulp.watch("app/scss/*.scss", gulp.series('scss'));
	gulp.watch("app/*.html").on('change', () => {
		browserSync.reload();
		done();
	});
	gulp.watch(["app/js/*.js", "!app/js/*.min.js"], gulp.series('js'));

	done();

});

gulp.task('html', function(){
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('default', gulp.series('scss', 'watch'));
