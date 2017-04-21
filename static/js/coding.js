imagePath = '../static/images/';


function shouldProjectBeShown(project) {
    exclude = 
    [
        'algorithmscheatsheet',
        'ar1st0crat.github.io',
        'console-blackjack',
        'digitalsignalprocessing',
        'oodesigncasestudies'
    ];
    var name = project.name.toLowerCase();

    return name.indexOf('course') < 0 && exclude.indexOf(name) < 0;
}

function fillProjects(projects) {
    var container = document.getElementById('projects');
    // exclude repos for teaching
    projects = projects.filter(shouldProjectBeShown);
    // sort by update date in descending order
    projects.sort(function(node1, node2) {
        return new Date(node1.updated_at) < new Date(node2.updated_at);
    });
    // let the dance begin...
    for (var i=0; i<projects.length; i++) {
        var project = document.createElement('article');
        project.setAttribute('class', 'project');
        
        var success = function(image) {
            return function(data) {
                parseScreenshot(data, image);
            }
        };

        loadFile("https://raw.githubusercontent.com/ar1st0crat/" + projects[i].name + "/master/README.md",
                success(project),
                function(xhr) { 
                    console.error(xhr); 
                }
        );

        var info = document.createElement('div');
        info.setAttribute('class', 'info');

        var titlespan = document.createElement('span');
        titlespan.setAttribute('class', 'projtitle');
        titlespan.textContent = projects[i].name;
        info.appendChild(titlespan);

        var infospan = document.createElement('span');
        infospan.textContent = projects[i].description;
        info.appendChild(infospan);
        
        var langspan = document.createElement('span');
        langspan.setAttribute('class', 'language');
        langspan.textContent = projects[i].language;
        info.appendChild(langspan);

        var d = new Date(projects[i].updated_at);
        infospan = document.createElement('span');
        infospan.textContent = 'Update date: ' + d.toDateString();
        info.appendChild(infospan);

        project.appendChild(info);

        var repolink = document.createElement('a');
        repolink.setAttribute('class', 'repolink');
        repolink.setAttribute('href', projects[i].html_url);
        repolink.textContent = 'GitHub link';
        project.appendChild(repolink);
        
        container.appendChild(project);
    }
}

function parseScreenshot(readme, project) {
    var re = /!\[.+\]\((.*\.png)/i;
    var path = readme.match(re);
    if (path != null)
        project.style.background = 'url(' + path[1] + '?raw=true) no-repeat center';
    else
        project.style.background = 'url(' + imagePath + 'terminal.png) no-repeat center';
    project.style.backgroundSize = 'contain';
}

function createProjects() {
    loadJSON("https://api.github.com/users/ar1st0crat/repos", fillProjects, function(xhr) { console.error(xhr); });
}
