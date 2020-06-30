var about_data = require('../public_html/js/data/about_me.json');
var accomplishment_data = require('../public_html/js/data/accomplishment_history.json');
var education_data = require('../public_html/js/data/education_history.json');
var job_data = require('../public_html/js/data/job_history.json');
var project_data = require('../public_html/js/data/projects.json');

var fs = require('fs');

//console.log(project_data);

function buildAbout(){
	var return_text = '<div id="about" class="aboutme section">'
                + '<h2>About</h2>'
                + '<div class="row">'
                + '<div class="attributes eight columns offset-by-two">';

    for (var i = 0; i < about_data.length; i++) {
    	return_text += '<div class="row">'
                            +'<h2 class="twelve columns">'+ about_data[i].title +'</h2>'
                            + '<span class="seven columns">' + about_data[i].content + '</span>'
                            + about_data[i].figure
                            + '<br style="clear:both;"/>'
                         + '</div>';
    }

    return_text += '</div></div></div>';
    return return_text;
}

function buildProjects(){
	var return_text = '<div id="projects" class="projects section">'
	                + '<h2>Projects</h2>'
                	+ '<ul class="row">';

    for (var i = 0; i < project_data.length; i++) {
    	return_text += '<li class="four columns"><img src="' 
    						+ project_data[i].project_img + '"/><a href="' 
    						+ project_data[i].project_link + '">'
    						+ project_data[i].project_title + '</a><span>'
    						+ project_data[i].project_description + '</span></li>';

    	if(((i+1) % 3) == 0 && (i+1) < project_data.length){
    		return_text += '</ul><ul class="row">';
    	}
    }

    return_text += '</ul></div>';
    return return_text;
}

function buildExperience(){
	// begin div section and unordered list
	var return_text = '<div id="experience" class="work-experience section"><h2>Experience</h2><ul>';

    for (var i = 0; i < job_data.length; i++) {
    	// begin organization row, title
    	return_text += '<li class="row"><h3 class="nine columns">'+ job_data[i].organization_title+'</h3>';

    	// add one title and description for each job in the org
    	for (var k = 0; k < job_data[i].jobs.length; k++) {
    		var job = job_data[i].jobs[k];
    		return_text += '<label class="nine columns">'+ job.job_title;
    		if(job.hasOwnProperty('job_start')){
    			return_text += " - " + job.job_start;
    			if(job.hasOwnProperty('job_end')){
    				return_text += " to " + job.job_end;
    			}
    		}
    		return_text += '</label>';
        	return_text += '<span class="nine columns">'+ job.job_description +'</span>';
    	}
        // add org image and close organization row list item
        return_text += '<img class="two columns right';
        // if specified to round logo do so
        if(job_data[i].hasOwnProperty('organization_img_rounded')){
        	return_text += ' rounded-logo';
        }
        // continue line, either if there is the if above or not
        return_text += '" src="'+ job_data[i].organization_img +'"/></li>';
    }

    // end unordered list and div section
    return_text += '</ul></div>';
    return return_text;
}


try {  
    var resume_head = fs.readFileSync('./public_html/templates/resume_header.html', 'utf8');
    var resume_education_and_accomplishments = fs.readFileSync('./public_html/templates/resume_education_and_accomplishments.html', 'utf8');
    var resume_foot = fs.readFileSync('./public_html/templates/resume_footer.html', 'utf8');

    var out_data = resume_head.toString();
    out_data += buildAbout();
    out_data += buildProjects();
    out_data += buildExperience();
    out_data += resume_education_and_accomplishments.toString();
    out_data += resume_foot.toString();

    fs.writeFileSync("./public_html/resume_json.html", out_data);
} catch(e) {
    console.log('Error:', e.stack);
}

