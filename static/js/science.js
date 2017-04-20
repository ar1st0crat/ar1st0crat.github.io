imagePath = '../static/images/';
paperPath = '../static/papers/'


function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

/*
        <article class="publication">
            <div class="pic">
                <img src='../static/images/pdf.png'/>
                <span>2008</span>
            </div>
            <div class="info">
                <span class="pubtitle">О проблеме параметризации речевого сигнала в современных системах распознавания речи</span>
                <span class="pubtitle">On the Problem of Speech Signal Parameterization in State-of-the-art Speech Recognition Systems</span>
                <span>Шарий Т.В.</span>
                <span>Вестник Донецкого национального университета</span>
                <span>С.536-541</span>
            </div>
        </article>
*/
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
