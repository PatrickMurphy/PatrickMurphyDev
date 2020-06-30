const { series } = require('gulp');
var gulp = require('gulp');
var ghpages = require('gh-pages');
var shell = require('shelljs');
var concat = require('gulp-concat');
var fs = require('fs');
var prettyHtml = require('gulp-pretty-html');


function runNode(path, cb1, cb){
	shell.exec('node '+ path, function(code, stdout, stderr){
		cb(code, stdout, stderr, cb1);
	});
}

function nodeCB(code, stdout, stderr, cb) {
	if(code !== 0){
		console.log('Program stderr:', stderr);
		shell.exit(1);
	}else{	
		cb();
	}
}

function buildResume(cb) {
	runNode('./build/build_resume.js', cb, nodeCB);
}

 
gulp.task('pretty', function () {
    return gulp.src('public_html/index.html')
        .pipe(prettyHtml())
        .pipe(gulp.dest('public_html'));
});

function publishGHPages(cb) {
	// publish branch for website
	ghpages.publish('public_html', function(){
		cb();
	});
}

exports.default = series(buildResume, gulp.task('pretty'), publishGHPages);
exports.build = series(buildResume, gulp.task('pretty'));
exports.publish = series(publishGHPages);