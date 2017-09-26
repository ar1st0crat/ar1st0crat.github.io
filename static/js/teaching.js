courses = 
[
    {
        "name": "Digital Signal Processing",
        "link": "https://github.com/ar1st0crat/DigitalSignalProcessing",
        "keywords": 
        [
            "sampling", "convolution", "filtering", "FFT", "FIR", "IIR", "impulse response", "spectral analysis", "z-transform"
        ]
    },
    {
        "name": "Programming in Python",
        "link": "https://github.com/ar1st0crat/PythonCourse",
        "keywords": 
        [
            "generators", "decorators", "numpy", "comprehensions", "pep8", "classes", "jupyter", "packages", "asynchrony"
        ]
    },
    {
        "name": "Object-oriented Design Case Studies",
        "link": "https://github.com/ar1st0crat/OODesignCaseStudies",
        "keywords": 
        [
            "Repository", "MVC", "MVP", "MVVM", "Specification", "GOF", "domain", "LINQ", "ORM"
        ]
    },
    {
        "name": "Introductory C++ course with a bit of advanced stuff",
        "link": "https://github.com/ar1st0crat/CppCourse",
        "keywords": 
        [
            "memory", "OOP", "overloading", "casts", "exceptions", "templates", "SFINAE", "STL", "RAII"
        ]
    },
    {
        "name": "Software Development",
        "link": "https://github.com/ar1st0crat/SoftDevCourse",
        "keywords": 
        [
            "SRS", "Gantt", "UML", "git", "bugtracker", "refactoring", "TDD", "mocks", "doxygen"
        ]
    },
    {
        "name": "Cheatsheet with codes of the most popular algorithms and data structures",
        "link": "https://github.com/ar1st0crat/AlgorithmsCheatSheet",
        "keywords": 
        [
            "sorting", "searching", "BST", "graphs", "stack", "queue", "heap", "lists", "BM, KMP"
        ]
    }
];

function randomizeKeywords() {
    var course_container = document.getElementById('courses');
    
    for (var i=0; i<courses.length; i++) {
        var course = document.createElement('article');
        course.setAttribute('class', 'course');

        var header = document.createElement('h3');
        header.textContent = courses[i].name;
        course.appendChild(header);

        for (var j=0; j<courses[i].keywords.length; j++) {
            var keyword = document.createElement('span');
            keyword.style.top = +(32*(j % 3) + 75) + "px";
            keyword.style.left = +(110 * (j/3) + 30) + "px";
            keyword.style.transform = "rotate(" + +(Math.random() * 30 - 15) + "deg)";
            keyword.style.visibility = "visible";
            keyword.textContent = courses[i].keywords[j];
            course.appendChild(keyword);
        }

        var link = document.createElement('a');
        link.setAttribute('href', courses[i].link);
        link.textContent = 'Course page';
        course.appendChild(link);

        course_container.appendChild(course);
    }
}
