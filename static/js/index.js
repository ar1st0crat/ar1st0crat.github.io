activities = 
[
    {
        "name": "music",
        "pic": "music.png",
        "desc": "There was even a time when I...<br/> \
               Long story short, here are some of my albums ))): <br/><br/> \
               - Songs from the Bathroom (2007)<br/> \
               - Ocelot's Wind (2009)<br/> \
               - The Philosopher (2011)"
    },
    {
        "name": "coding",
        "pic": "coding.png",
        "desc": "I love C#, C++ and Python!<br/> \
               <img src='static/images/csharp.png' class='language'> \
               <img src='static/images/cpp.png' class='language'> \
               <img src='static/images/python.png' class='language'>"
    },
    {
        "name": "teaching",
        "pic": "teaching.png",
        "desc": "Courses I taught (hopefully good):<br/><br/> \
               - Digital Signal Processing<br/> \
               - Programming in Python<br/> \
               - Object-oriented programming<br/> \
               - Software development"
    },
    {
        "name": "writing",
        "pic": "writing.png",
        "desc": "<br/>To rephrase Annie Lennox:<br/><br/> \
                 <q>The poetic side of me is Donetsk-ish</q>"
    },
    {
        "name": "science",
        "pic": "science.png",
        "desc": "<br/>I'm interested in audio processing, fuzzy logic, machine learning and data mining. \
                <br/><br/>Some of my papers can be found here"
    }
];

path = "static/images/";

DEFAULT_DESC = "<div id='aboutme'><div><p>Hi there! I'm Tim.</p> \
               I like unravelling mysteries of all kinds and learning everything that human mind can possibly bring us, \
               i.e. science, music, poetry, arts, philosophy, etc.</div>\
               <div id='photo'><div id='photo_copyright'>Author: <a href='https://github.com/KruKrush'>KruKrush</a></div></div></div>";


function createActivities() {
    var container = document.getElementById('main');
    
    for (var i=0; i<activities.length; i++) {

        var activity = document.createElement('div');
        activity.setAttribute('class', 'main-icon');
        
        var img = document.createElement('img');
        img.setAttribute('src', path + activities[i].pic);
        activity.appendChild(img);

        var p = document.createElement('p');
        p.innerHTML = activities[i].name;
        activity.appendChild(p);
        
        activity.onmouseenter = updateText(activities[i].desc);
        activity.onclick = clickActivity(activities[i].name);
        
        container.appendChild(activity);
    }

    initIcons();

    document.getElementById('main').onmouseleave = updateText('');

    updateText('')();
}

function initIcons() {
    var elems = document.getElementsByClassName('main-icon');
    for (var i=0; i<elems.length; i++) {
        elems[i].style.borderTopLeftRadius = 40 + Math.random() * 10 + "%";
        elems[i].style.borderTopRightRadius = 40 + Math.random() * 10 + "%";
        elems[i].style.borderBottomLeftRadius = 40 + Math.random() * 10 + "%";
        elems[i].style.borderBottomRightRadius = 40 + Math.random() * 10 + "%";
    }
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