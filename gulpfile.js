const { series } = require('gulp');
var ghpages = require('gh-pages');
var shell = require('shelljs');

function publishGHPages(cb) {
	// publish branch for website
	ghpages.publish('public_html', function(){
		cb();
	});
}

exports.default = series(publishGHPages);