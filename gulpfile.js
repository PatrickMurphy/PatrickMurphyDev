const { series } = require('gulp');
var ghpages = require('gh-pages');
var shell = require('shelljs');
var concat = require('gulp-concat');
var fs = require('fs');

/*function generateResume(cb) {
	return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));

	var newText = "";

	fs.writeFile("public_html/index.html", newText, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	});
}*/

function publishGHPages(cb) {
	// publish branch for website
	ghpages.publish('public_html', function(){
		cb();
	});
}

exports.default = series(publishGHPages);