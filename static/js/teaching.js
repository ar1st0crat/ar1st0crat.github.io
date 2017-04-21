function randomizeKeywords() {
    var courses = document.getElementsByClassName('course');
    
    for (var i=0; i<courses.length; i++) {
        var keywords = courses[i].getElementsByTagName('span');

        for (var j=0; j<keywords.length; j++) {
            keywords[j].style.top = +(32*(j % 3) + 75) + "px";
            keywords[j].style.left = +(110 * (j/3) + 30) + "px";
            keywords[j].style.transform = "rotate(" + +(Math.random() * 30 - 15) + "deg)";
            keywords[j].style.visibility = "visible";
        }
    }
}
