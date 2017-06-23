function loadJSON(path, success, error, forbidden, waiting) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            }
            // wait for github api cache (a couple of seconds should be enough)
            else if (xhr.status === 202) {
                if (waiting) {
                    waiting(xhr);
                }
            }
            else if (xhr.status === 403) {
                if (forbidden)
                    forbidden(JSON.parse(xhr.responseText));
            }
            else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function loadFile(path, success, error, notfound) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(xhr.responseText);
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.onload = function() {
        if (xhr.status === 404) {
            if (notfound)
                notfound();
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
