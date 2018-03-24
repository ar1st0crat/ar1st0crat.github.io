imagePath = '../static/images/';
paperPath = '../static/papers/'


function fillPapers(papers) {
    var container = document.getElementById('publications');

    papers.sort(function(node1, node2) {
        return node2.year - node1.year;
    });
    
    for (var i=0; i<papers.length; i++) {

        var paper = document.createElement('article');
        paper.setAttribute('class', 'publication');
        
        // create pdf icon and year (left panel)

        var pic = document.createElement('div');
        pic.setAttribute('class', 'pic');

        var img = document.createElement('img');
        img.setAttribute('src', imagePath + '/pdf.png');
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
    loadJSON("../static/text/papers.json", fillPapers, function(xhr) { console.error(xhr); });
}

function showSkills(id) {
    var descriptions = 
    {
        'dsp': 'FFT, MFCC, PNCC, filtering, etc.',
        'ai': 'fuzzy logic, neural networks, evolutionary algorithms, etc.',
        'synthesis': 'LPC, pitch, digital sound effects, etc.'
    };
    var elem = document.querySelector('#' + id + ' span');

    prevText = elem.textContent;

    elem.textContent = descriptions[id];
    elem.style.paddingTop = +(105 - descriptions[id].length) + 'px';
    elem.style.textTransform = 'none';
    elem.style.fontSize = '20px';
}

function hideSkills(id) {
    var elem = document.querySelector('#' + id + ' span');
    elem.textContent = prevText;
    elem.style.textTransform = 'uppercase';
    elem.style.paddingTop = '45px';
    elem.style.fontSize = '26px';
}

research = [
    'Speech signal is segmented automatically on basis of Mel-Frequency Cepstrum (MFCC) and phonological differential features',
    'The weights of speech segments are evaluated depending on their perception by human (prosodic features are analyzed)',
    'The Principal Component Analysis is used for post-processing of MFCC coefficients',
    'Speech information is processed at several levels: prosodic level, phonological feature level, phoneme level and word level',
    'Backend relies on the FCAS model whose kernel slightly resembles TRACE and LSTM networks'
];

function createHandlers() {
    curSel = null;
    var elems = document.getElementsByClassName('rs');
    for (var i=0; i<elems.length; i++) {
        elems[i].onclick = handler(i, elems[i]);
    }
    document.onclick = handler(-1);
}

function handler(pos, elem) {
    
    return function(event) {
        if (pos < 0) {
            if (curSel !== null) curSel.classList.remove('selected');
            curSel = null;

            document.getElementById('researchname').textContent = 'Speech data processing based on soft computing models';
            document.getElementById('showscreen').setAttribute('src', '../static/images/research.png');
        }
        else {
            document.getElementById('researchname').textContent = research[pos];
            var img = elem.getElementsByTagName('img')[0];
            document.getElementById('showscreen').setAttribute('src', img.getAttribute('src'));
            var span = elem.getElementsByTagName('span')[0];
            span.classList.toggle('selected');
            if (curSel !== null) curSel.classList.remove('selected');
            curSel = span;

            event.stopPropagation();
        }
    }
}