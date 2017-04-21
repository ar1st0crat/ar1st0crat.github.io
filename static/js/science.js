imagePath = '../static/images/';
paperPath = '../static/papers/'


function fillPapers(papers) {
    var container = document.getElementById('publications');

    papers.sort(function(node1, node2) {
        return node1.year < node2.year;
    })
    
    for (var i=0; i<papers.length; i++) {

        var paper = document.createElement('article');
        paper.setAttribute('class', 'publication');
        
        // create pdf icon and year (left panel)

        var pic = document.createElement('div');
        pic.setAttribute('class', 'pic');

        var img = document.createElement('img');
        img.setAttribute('src', '../static/images/pdf.png');
        var link = document.createElement('a');
        link.setAttribute('href', paperPath + papers[i].link);
        link.appendChild(img);

        pic.appendChild(link);
        
        var picspan = document.createElement('span');
        picspan.textContent = papers[i].year;
        pic.appendChild(picspan);


        // create paper info (right panel)

        var info = document.createElement('div');
        info.setAttribute('class', 'info');

        var titlespan = document.createElement('span');
        titlespan.setAttribute('class', 'pubtitle');
        titlespan.textContent = papers[i].russian;
        info.appendChild(titlespan);
        titlespan = document.createElement('span');
        titlespan.setAttribute('class', 'pubtitle');
        titlespan.textContent = papers[i].english;
        info.appendChild(titlespan);

        var infospan = document.createElement('span');
        infospan.textContent = papers[i].authors;
        info.appendChild(infospan);
        infospan = document.createElement('span');
        infospan.textContent = papers[i].journal;
        info.appendChild(infospan);
        infospan = document.createElement('span');
        infospan.textContent = papers[i].pages;
        info.appendChild(infospan);
        
        paper.appendChild(pic)
        paper.appendChild(info);
        
        container.appendChild(paper);
    }
}

function createPapers() {
    loadJSON("../static/text/papers.json",
                function(data) { 
                    fillPapers(data);
                },
                function(xhr) { 
                    console.error(xhr); 
                }
    );
}
