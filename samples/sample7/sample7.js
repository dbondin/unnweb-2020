var SAMPLE7 = {
    onload: function() {
	SAMPLE7.loadusers();
    }
    ,
    loadusers: function() {
	console.log("starting loading users");
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = SAMPLE7.onusersloaded;
	xhr.open("GET", "https://jsonplaceholder.typicode.com/users/", true);
	xhr.send();
    }
    ,
    onusersloaded: function() {
	console.log("onusersloaded");
	if(this.readyState === XMLHttpRequest.DONE) {
	    if (this.status === 200) {
		var users = JSON.parse(this.responseText);
		console.log(users);
		SAMPLE7.writeusers(users);
	    } else {
		console.error("error loading users");
	    }
	}
    }
    ,
    writeusers: function(users) {
	console.log("writeusers");
	var totalhtml = "";
	for(i in users) {
	    var u = users[i];
	    var uhtml = "<div class='user-div' id='user-" + u.id + "' userid='" + u.id + "' onclick='SAMPLE7.onuserclicked(this)'>";
	    uhtml += "<span userid='" + u.id + "' onclick='SAMPLE7.onusermenuclicked(this)'>&#x2630;</span>&nbsp";
	    uhtml += u.name;
	    uhtml += "<div id='user-info-div-" + u.id + "' class='user-info' style='display:none;'>";
	    uhtml += "<div class='user-info-line'>email: " + u.email + "</div>";
	    uhtml += "<div class='user-info-line'>phone: " + u.phone + "</div>";
	    uhtml += "</div>"
	    uhtml += "</div>";

	    totalhtml += uhtml;
	}
	SAMPLE7.usersdiv.innerHTML = totalhtml;
    }
    ,
    onusermenuclicked: function(usermenuspan) {
	var uid = usermenuspan.getAttribute("userid");
	console.log(uid);
	var uinfodiv = document.getElementById("user-info-div-" + uid);
	if(uinfodiv.style.display === "none") {
	    uinfodiv.style.display = "block";
	}
	else {
	    uinfodiv.style.display = "none";
	}
    }
    ,
    usersdiv: document.getElementById("users-div")
    ,
    postsdiv: document.getElementById("posts-div")
    ,
    selecteduser: undefined
    ,
    onuserclicked: function(userdiv) {
	console.log("onuserclicked");
	if(SAMPLE7.selecteduser !== undefined) {
	    var prevuserdiv = document.getElementById("user-" + SAMPLE7.selecteduser);
	    prevuserdiv.className = "user-div";
	}
	//select new one
	console.log(userdiv.className);
	userdiv.className = "user-div user-selected-div";
	SAMPLE7.selecteduser = userdiv.getAttribute("userid");

	SAMPLE7.loadposts();
    }
    ,
    loadposts: function() {
	console.log("starting loading posts for user " + SAMPLE7.selecteduser);
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = SAMPLE7.onpostsloaded;
	xhr.open("GET", "https://jsonplaceholder.typicode.com/users/" + SAMPLE7.selecteduser + "/posts", true);
	xhr.send();
    }
    ,
    onpostsloaded: function() {
	console.log("onpostsloaded");
	if(this.readyState === XMLHttpRequest.DONE) {
	    if (this.status === 200) {
		var posts = JSON.parse(this.responseText);
		console.log(posts);
		SAMPLE7.writeposts(posts);
	    } else {
		console.error("error loading posts");
	    }
	}
    }
    ,
    writeposts: function(posts) {
	console.log("writeposts");
	var totalhtml = "";
	for(i in posts) {
	    var p = posts[i];
	    var phtml = "<div class='post-div' id='post-" + p.id + "' postid='" + p.id + "' onclick='SAMPLE7.onpostclicked(this)'>";
	    
	    phtml += "<div class='post-title'>"
	    phtml += p.title;
	    phtml += "</div>"
	    
	    phtml += "<div class='post-body'>"
	    phtml += p.body;
	    phtml += "</div>"
	    
	    phtml += "</div>";

	    totalhtml += phtml;
	}
	SAMPLE7.postsdiv.innerHTML = totalhtml;
    }
};
