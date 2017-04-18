collections = 
[
    {
        "collection": "Сонеты",
        "pic": "book.png",
        "entries":
        [
            {
                "name": "Сонет 1 - В тебе есть музыка",
                "text": 
                [
                    "В тебе есть музыка, созвучная моей.",
                     "Пускай, мы разные: ты арфа, я фагот.",
                     "И хоть играем мы порой наоборот,",
                     "Ты скажешь ноту - и роднюсь я с ней.",
                     "",
                     "Я слушаю тебя, и с каждым днем сильней",
                     "Гремит аккорд, во мне переворот.",
                     "Мой темп другой и строй, увы, не тот,",
                     "Но как мне жить без стройности твоей?",
                     "",
                     "Твой каждый взгляд изысканно звучит.",
                     "Весенним утром льется не спеша",
                     "Твоя соната, и весь мир молчит.",
                     "",
                     "Я слушаю тебя едва дыша,",
                     "И сердце в такт с твоим опять стучит,",
                     "Дрожит с твоей струной моя душа."
                ],
                "written": "2011"
            },
            {
                "name": "Сонет 2 - Она проста и этим гениальна",
                "text": 
                [
                    "Уверен я, в простом сокрыта тайна,",
                    "Но мы, увы, на показное падки.",
                    "А в ней секреты мира, все загадки.",
                    "Она проста. И этим гениальна!",
                    "",
                    "При сложности была б не идеальна.",
                    "Томят не долгие, а те, что кратки,",
                    "Движенья, взгляды, речи и повадки.",
                    "Она чудна. Проста, но не банальна.",
                    "",
                    "Нет мишуры в ней, это так прекрасно,",
                    "Что любоваться ею можно бесконечно.",
                    "И так естественна, не тратится напрасно",
                    "",
                    "На то, что чуждо ей и что недолговечно.",
                    "Проста и непроста (и ясно, и неясно),",
                    "Без лишних украшений... безупречна."
                ],
                "written": "2011"
            }
        ]
    },
    {
        "collection": "Лирический цикл 'while (true)'",
        "pic": "book.png",
        "entries":
        [
            {
                "name": "Без макияжа",
                "text": 
                [
                    "О, человек по имени Татьяна!",
                    "Еще вчера я был в тебя влюблен,",
                    "Когда во вьющемся дыму кальяна",
                    "Был красотой твоею так ошеломлен.",
                    "",
                    "Когда ведомый простоватой страстью",
                    "С Венерой неожиданно тебя сравнил",
                    "И шубутным гормоном данной властью,",
                    "Тебя я в стиле Казановы соблазнил.",
                    "",
                    "Но это было поздно, на закате суток,",
                    "И ночь прошла так сказочно; с утра же",
                    "Раздался крик, и был мой вопль жуток:",
                    "Ты предо мною выросла без макияжа!..",
                    "",
                    "/Запись крика в mp3 доступна зарегистрированным пользователям/"
                ],
                "written": "2013"
            },
            {
                "name": "Спасательный друг",
                "text": 
                [
                    "Ты спасательный друг,",
                     "Снова брошен в беде:",
                     "Утопающий вдруг",
                     "Усомнился в себе.",
                     "",
                     "Своей легкостью вновь",
                     "Ты от бед его спас,",
                     "Разогнал ему кровь",
                     "И порадовал глаз.",
                     "",
                     "В его мире тревог",
                     "Ты востребован, гость.",
                     "Человеку помог...",
                     "И повешен на гвоздь." 
                ],
                "written": "2012"
            }
        ]
    }
];

path = "../static/images/";


function createLyrics() {
    var container = document.getElementById('collections');
    
    for (var i=0; i<collections.length; i++) {

        var collection = document.createElement('div');
        collection.setAttribute('class', 'collection-icon');
        
        var img = document.createElement('img');
        img.setAttribute('src', path + collections[i].pic);
        collection.appendChild(img);

        var p = document.createElement('p');
        p.innerHTML = collections[i].collection + ' (' + collections[i].entries.length + ')';
        collection.appendChild(p);
        
        //activity.onmouseenter = updateText(activities[i].desc);
        //activity.onclick = clickActivity(activities[i].name);
        
        container.appendChild(collection);
    }

    var t = collections[0].entries[0].text;

    var textElement = document.getElementById('text');
    
    textElement.innerHTML = collections[0].entries[0].name.toUpperCase() + "<br/><br/>";
    for (var i=0; i<t.length; i++) {
        textElement.innerHTML += t[i] + "<br/>";
    }
    textElement.innerHTML += "<br/>(c) " + collections[0].entries[0].written;
}

function updateText(desc) {
    var txt = desc;
    if (txt === '')
        txt = DEFAULT_DESC;

    return function () {
        document.getElementById('desc').innerHTML = txt;
    }
}

function clickActivity(activity) {
    return function () {
        location.href = "views/" + activity + ".html";
    }
}