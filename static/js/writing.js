imagePath = '../static/images/';
lyrics = '';

function getFrequentWords(collections) {
    var separators = /([ .,;:!\?\(\)]+)/g;
    var stop_words = ['без', 'под', 'над', 'перед', 'после', 'был', 'была', 'или', 'если', 'тем', 'своих',
                      'есть', 'этот', 'этим', 'этой', 'этими', 'моей', 'мне', 'ведь', 'этого', 'может',
                      'мой', 'как', 'при', 'что', 'все', 'это', 'так', 'ней', 'лысый', 'нее', 'чтобы',
                      'для', 'тебя', 'тебе', 'твой', 'твоей', 'его', 'ему', 'нам', 'своей', 'раз', 'потому',
                      'вас', 'кого', 'вам', 'хоть', 'нет', 'когда', 'даже', 'еще', 'уже', 'между', 'другим',
                      'было', 'лишь', 'тоже', 'вот', 'того', 'мной', 'него', 'быть', 'такой', 'вероники',
                      'гхшш', 'фрося', 'аристарх', 'через', 'чтоб', 'весь', 'всех', 'они', 'там', 'меня',
                      'сердца', 'будешь', 'буду', 'будет', 'просто', 'рыбка', 'где', 'спустя', 'каждый'];
    var all_words = {};
    for (var i = 0; i < 2; i++) {
        var collection = collections[i].entries;
        for (var j = 0; j < collection.length; j++) {
            words = collection[j].name.replace(separators,' ').split(' ');
            for (var k = 0; k < collection[j].text.length; k++) {
                words.push.apply(words, collection[j].text[k].replace(separators,' ').split(' '));
            }
            words.forEach(function(w) {
                w = w.toLowerCase();
                if (w.length < 3 || w.length > 6 || stop_words.indexOf(w) > -1)
                    return;
                if (all_words[w])
                    all_words[w]++;
                else
                    all_words[w] = 1;
            });
        }
    }
    return all_words;
}

function fillLyrics(collections) {
    var frequent_words = getFrequentWords(collections);

    var keywords = Object.keys(frequent_words).filter(function(w) {
        return frequent_words[w] > 1;
    });
    keywords.sort(function(a, b) {
        return Math.random() - 0.5;
    });

    var page = document.getElementById('text');

    for (var i=0; i<keywords.length; i++) {
        var keyword_span = document.createElement('span');
        keyword_span.setAttribute('class', 'keyword');
        keyword_span.textContent = keywords[i];
        keyword_span.style.fontSize = +(frequent_words[keywords[i]]*7 + 11) + 'px';
        page.appendChild(keyword_span);
    }

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
        list.style.left = -100*i + 'px';
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