imagePath = '../static/images/';

all_commits = [];
repo_count = 0;

/** draw platform for 3d-commits */
function drawCommitsPanel() {
    var panel = document.getElementById('commitspanel');
    var platform = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    points = '0,60 530,273 610,240 80,27';
    platform.setAttribute('points', points);
    platform.setAttribute('fill', 'rgb(240,240,240)');
    panel.appendChild(platform);
    for (var i=0; i<=52 /* number of weeks in year */; i++) {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', 10 + 10*i);
        line.setAttribute('y1', 60 + 4*i);
        line.setAttribute('x2', 80 + 10*i);
        line.setAttribute('y2', 32 + 4*i);
        line.setAttribute('stroke', 'rgb(212,212,212)');
        panel.appendChild(line);
    }
    for (var i=0; i<=7 /* number of days in week */; i++) {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', 10 + 10*i);
        line.setAttribute('y1', 60 - 4*i);
        line.setAttribute('x2', 530 + 10*i);
        line.setAttribute('y2', 268 - 4*i);
        line.setAttribute('stroke', 'rgb(212,212,212)');
        panel.appendChild(line);
    }
    var today = new Date();
    document.getElementById('date_now').textContent = today.toDateString();
    today.setMonth(today.getMonth() - 12);
    document.getElementById('date_before').textContent = today.toDateString();
}

/** github api commit_activity returns something like this:
commits[i].days    =>     [0, 1, 0, 0, 2, 0, 1]
commits[i].total   =>     4
*/
function updateCommitsPanel(commits) {
    var total_commits = 0;
    if (all_commits.length === 0) {
        all_commits = new Array(commits.length);
        for (var i=0; i<commits.length; i++)
            all_commits[i] = [0, 0, 0, 0, 0, 0, 0];
    }
    for (var i=0; i<all_commits.length; i++) {
        for (var j=0; j<7; j++) {
            all_commits[i][j] += commits[i].days[j];
            total_commits += all_commits[i][j];
        }
    }

    repo_count++;

    var info = document.getElementById('commits_no');
    info.textContent = total_commits + ' commits';
    var repo = document.getElementById('repo_count');
    repo.textContent = repo_count + ' repos';

    var panel = document.getElementById('commitspanel');

    // magic constants! real web-development! )))
    for (var i=0; i<all_commits.length; i++) {
        for (var j=6; j>=0; j--) {
            if (all_commits[i][6-j] > 0) {
                var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                poly.setAttribute('fill', 'rgb(50,' + +(255 - all_commits[i][6-j]*30) + ',50)');
                var pts = +(10 + 10*i + 10*j) + ',' + +(50 + 4*i - 4*j - all_commits[i][6-j]*9) + ' ' +
                          +(10 + 10*i + 10*j) + ',' + +(60 + 4*i - 4*j) + ' ' +
                          +(20 + 10*i + 10*j) + ',' + +(64 + 4*i - 4*j) + ' ' +
                          +(30 + 10*i + 10*j) + ',' + +(60 + 4*i - 4*j) + ' ' +
                          +(30 + 10*i + 10*j) + ',' + +(50 + 4*i - 4*j - all_commits[i][6-j]*9) + ' ' +
                          +(20 + 10*i + 10*j) + ',' + +(46 + 4*i - 4*j - all_commits[i][6-j]*9);
                poly.setAttribute('points', pts);
                poly.setAttribute('stroke', 'rgba(100,100,100,0.1)');
                panel.appendChild(poly);
                // add internal lines in each cube for better 3d look
                var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute('x1', 20 + 10*i + 10*j);
                line.setAttribute('y1', 54 + 4*i - 4*j - all_commits[i][6-j]*9);
                line.setAttribute('x2', 10 + 10*i + 10*j);
                line.setAttribute('y2', 50 + 4*i - 4*j - all_commits[i][6-j]*9);
                line.setAttribute('stroke', 'rgba(205,255,205,0.1)');
                line.setAttribute('stroke-width', 1);
                panel.appendChild(line);
                line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute('x1', 20 + 10*i + 10*j);
                line.setAttribute('y1', 54 + 4*i - 4*j - all_commits[i][6-j]*9);
                line.setAttribute('x2', 20 + 10*i + 10*j);
                line.setAttribute('y2', 64 + 4*i - 4*j);
                line.setAttribute('stroke', 'rgba(205,255,205,0.1)');
                line.setAttribute('stroke-width', 1);
                panel.appendChild(line);
                line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute('x1', 20 + 10*i + 10*j);
                line.setAttribute('y1', 54 + 4*i - 4*j - all_commits[i][6-j]*9);
                line.setAttribute('x2', 30 + 10*i + 10*j);
                line.setAttribute('y2', 50 + 4*i - 4*j - all_commits[i][6-j]*9);
                line.setAttribute('stroke', 'rgba(205,255,205,0.1)');
                line.setAttribute('stroke-width', 1);
                panel.appendChild(line);
            }
        }
    }
}

function shouldProjectBeShown(project) {
    exclude = 
    [
        'algorithmscheatsheet',
        'ar1st0crat.github.io',
        'digitalsignalprocessing',
        'oodesigncasestudies'
    ];
    var name = project.name.toLowerCase();

    return name.indexOf('course') < 0 && exclude.indexOf(name) < 0;
}

function fillProjects(projects) {
    var container = document.getElementById('projects');

    for (var i=0; i<projects.length; i++) {
        // this callback is needed when GitHub API rebuilds cache and info should be reloaded after some time
        var reloadCallback = function(projname) {
            return function(xhr) {
                console.log(xhr.message);
                document.querySelector('#commits p').innerHTML = 
                    'My GitHub activity<br/>Please wait while GitHub updates activity info!';
                setTimeout(function() { 
                    reloadProject(projname);
                }, 2000);
            }
        };
        // requesting commit activity may end up with several different results
        loadJSON("https://api.github.com/repos/ar1st0crat/" + projects[i].name + "/stats/commit_activity",
                // if everything's OK
                updateCommitsPanel,
                // error
                function(xhr) { 
                    console.error(xhr);
                },
                // forbidden
                function(xhr) {
                    console.log(xhr.message);
                    warningGithubActivity();
                },
                // need to wait for github api cache build
                reloadCallback(projects[i].name)
        );
    }
    // exclude repos for teaching
    projects = projects.filter(shouldProjectBeShown);
    // sort by update date in descending order
    projects.sort(function(node1, node2) {
        return new Date(node1.pushed_at) < new Date(node2.pushed_at);
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

        var d = new Date(projects[i].pushed_at);
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
    drawCommitsPanel();
    loadJSON("https://api.github.com/users/ar1st0crat/repos",
        // OK
        fillProjects,
        // error
        function(xhr) { 
            console.error(xhr);
        },
        // forbidden
        function(xhr) {
            console.log(xhr.message);
            var warning = document.querySelector('#projects p');
            warning.innerHTML = 'Could not load pet projects from GitHub :-(<br/>Try again later';
            warning.style.color = 'rgba(255,100,100, 0.8)';
            warning.style.fontSize = '1.5em';
            warningGithubActivity();
        });
}

function warningGithubActivity() {
    var warning = document.querySelector('#commits p');
    warning.innerHTML = 'My GitHub activity<br/>\
                            Not all repositories were processed by GitHub API!<br/>\
                            Try reloading the page';
    warning.style.color = 'rgba(255,150,150, 0.8)';
}

function reloadProject(project) {
    loadJSON("https://api.github.com/repos/ar1st0crat/"  + project + "/stats/commit_activity",
                // if everything's OK
                function(xhr) {
                    updateCommitsPanel(xhr);
                    document.querySelector('#commits p').innerHTML = 'My GitHub activity';
                },
                // error
                function(xhr) { 
                    console.error(xhr);
                },
                // forbidden
                function(xhr) {
                    console.log(xhr.message);
                    warningGithubActivity();
                },
                // github api cache is still building, so just tell user to reload manually later
                function(xhr) {
                    console.log(project);
                    document.querySelector('#commits p').innerHTML = 
                        'My GitHub activity<br/>GitHub still updates activity info! Try reloading the page later';
                }
        );
}