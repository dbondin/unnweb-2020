var SAMPLE9 = {
    onload: function() {
	SAMPLE9.loadstudents();
    }
    ,
    loadstudents: function() {
	console.log("starting loading students");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = SAMPLE9.onstudentsloaded;
	xhr.open("GET", "/api/students", true);
	xhr.send();
    }
    ,
    onstudentsloaded: function() {
	console.log("onstudentsloaded");
	if(this.readyState === XMLHttpRequest.DONE) {
	    if (this.status === 200) {
		var students = JSON.parse(this.responseText);
		console.log(students);
		SAMPLE9.writestudents(students);
	    } else {
		console.error("error loading students");
	    }
	}
    }
    ,
    writestudents: function(students) {
	console.log("writestudents");
	var totalhtml = "";
	for(i in students) {
	    var u = students[i];
	    var uhtml = "<div class='student-div' id='student-" + u.id + "' studentid='" + u.id + "' onclick='SAMPLE9.onstudentclicked(this)'>";
	    uhtml += "<span studentid='" + u.id + "' onclick='SAMPLE9.onstudentmenuclicked(this)'>&#x2630;</span>&nbsp";
	    uhtml += u.name;
	    uhtml += "<div id='student-info-div-" + u.id + "' class='student-info' style='display:none;'>";
	    uhtml += "<div class='student-info-line'>age: " + u.age + "</div>";
	    uhtml += "<div class='student-info-line'>group: " + u.group + "</div>";
	    uhtml += "</div>"
	    uhtml += "</div>";

	    totalhtml += uhtml;
	}
	SAMPLE9.studentsdiv.innerHTML = totalhtml;
    }
    ,
    onstudentmenuclicked: function(studentmenuspan) {
	var uid = studentmenuspan.getAttribute("studentid");
	console.log(uid);
	var uinfodiv = document.getElementById("student-info-div-" + uid);
	if(uinfodiv.style.display === "none") {
	    uinfodiv.style.display = "block";
	}
	else {
	    uinfodiv.style.display = "none";
	}
    }
    ,
    studentsdiv: document.getElementById("students-div")
    ,
    selectedstudent: undefined
    ,
    onstudentclicked: function(studentdiv) {
	console.log("onstudentclicked");
	if(SAMPLE9.selectedstudent !== undefined) {
	    var prevstudentdiv = document.getElementById("student-" + SAMPLE9.selectedstudent);
	    prevstudentdiv.className = "student-div";
	}
	//select new one
	console.log(studentdiv.className);
	studentdiv.className = "student-div student-selected-div";
	SAMPLE9.selectedstudent = studentdiv.getAttribute("studentid");
    }
};
