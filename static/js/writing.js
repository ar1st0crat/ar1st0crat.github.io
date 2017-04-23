imagePath = '../static/images/';
lyrics = '';


function fillLyrics(collections) {
    var container = document.getElementById('collections');
    
    for (var i=0; i<collections.length; i++) {

        var collection = document.createElement('li');
        collection.setAttribute('class', 'collection');
        
        var img = document.createElement('img');
        img.setAttribute('src', imagePath + collections[i].pic);
        collection.appendChild(img);

        var span = document.createElement('span');
        span.innerHTML = collections[i].collection + ' (' + collections[i].entries.length + ')';
        collection.appendChild(span);

        var list = document.createElement('ul');
        list.setAttribute('class', 'dropdown-collection');
        for (var j=0; j<collections[i].entries.length; j++) {
            var entry = document.createElement('li');
            entry.textContent = collections[i].entries[j].name;
            entry.onclick = clickEntry(i, j);
            list.appendChild(entry);
        }
        collection.appendChild(list);
        
        container.appendChild(collection);
    }
}

function createLyrics() {
    loadJSON("../static/text/lyrics.json",
                function(data) { 
                    lyrics = data;
                    fillLyrics(data);
                },
                function(xhr) { 
                    console.error(xhr); 
                }
    );
}

function clickEntry(colNo, entryNo) {
    
    return function() {
        var entry = lyrics[colNo].entries[entryNo];
        
        var textElement = document.getElementById('text');
        textElement.style.fontSize = '1.3em';
        
        // TODO: make it a separate html tag
        textElement.innerHTML = entry.name.toUpperCase() + "<br/><br/>";

        for (var i=0; i<entry.text.length; i++) {
            textElement.innerHTML += entry.text[i] + "<br/>";
        }
        textElement.innerHTML += "<br/>(c) " + entry.written;
    }
}