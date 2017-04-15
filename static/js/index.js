function random_corners() {
    var elems = document.getElementsByClassName('main-icon');
    for (var i=0; i<elems.length; i++) {
        elems[i].style.borderTopLeftRadius = 40 + Math.random() * 10 + "%";
        elems[i].style.borderTopRightRadius = 40 + Math.random() * 10 + "%";
        elems[i].style.borderBottomLeftRadius = 40 + Math.random() * 10 + "%";
        elems[i].style.borderBottomRightRadius = 40 + Math.random() * 10 + "%";
    }
}