/*
    apps.html JS functions
    @author Tom Booker

            NOTES

    I made the MySQL table to contain numbers for app status, with '1' being "Down" etc.
    I realised that this was pointless; I should've used the words, because now there's two
    functions, one to convert from number, and one to number; using a word in the database would've
    made things much simpler.


 */

/*
    Function for index.html to display apps
    apps are displayed within a div that has a grid style added
    so each app is automatically sorted within the grid
 */
function checkApps() {
    $.getJSON('http://localhost:3000/getapps', function (res) {
        var caro = "";
        for (var i = 0; i < res.Data.length; i++) {

            /*
                The class "appsBox" is the class for the parent div to sort each app into a grid
                You can change the font size by changing <h3> to another <h*>, or adding a style to change font size
             */
            caro += "<div id='" + res.Data[i].id + "' class='appsBox" + res.Data[i].appstatus + "'><h3>" + res.Data[i].appname + "</h3></div>"
        }
        document.getElementById("appHomeMsg").innerHTML = caro;
    });
}

/*
    Function for apps.html within the admin panel to display apps
    apps are displayed in a table
 */
function checkAppsAdmin() {
    $.getJSON('http://localhost:3000/getapps', function (res) {
        // beginning part of table - has to be OUTSIDE of loop, or it will mess up
        var caro = "<table class='centered striped'><thead><tr><th style='width: 40%'>Application</th><th style='width: 15%'>Status</th><th style='width: 25%;'>Modify</th></tr></thead><tbody>";

        for (var i = 0; i < res.Data.length; i++) {

            var id = res.Data[i].appid;
            var title = res.Data[i].appname;
            var status = res.Data[i].appstatus;
            var msg = appStatus(res.Data[i].appstatus);

            // Take care if editing this, the quotation marks are tricky
            caro += "<tr id='"+ id +"'><td><h5 id='"+ id +".title' >" +
                title + "</h5></td><td><p id='"+ id +".text' data-jq-dropdown='#jq-dropdown-" + id + "' class='appsBox" + status +"'>" + msg + "</p>" +
                appCheckBox(msg, id) + "</td><td><span class='waves-effect waves-light btn red accent-3'><i class='small material-icons' style='color: white' onclick='editApp(this)'>edit</i></span>" +
                "<span class='waves-effect waves-light btn red accent-3'><i class='small material-icons' style='color: white' onclick='deleteApp(this)'>delete</i></span></td>";

        }

        // Closing the table - has to be OUTSIDE of the loop
        caro += "</tbody></table>";
        document.getElementById("appsAdmin").innerHTML = caro;
    });
}

/*
    Function to create the dropdown status update
    It was necessary to create an if/else with different options because
    I couldn't figure out how to auto-check the right radio button otherwise
 */
function appCheckBox(x, y) {
    if (x === "Down") {
        return "<div  id='jq-dropdown-" + y + "' class='jq-dropdown'><ul class='jq-dropdown-menu'>" +
        "<form><label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='up'>Up</li></label>" +
        "<label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='issues'>Issues</li></label>" +
        "<label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='down' checked>Down</li></label>" +
        "</form></ul></div>";
    }
    else if (x === "Issues") {
        return "<div  id='jq-dropdown-" + y + "' class='jq-dropdown'><ul class='jq-dropdown-menu'>" +
        "<form><label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='up' >Up</li></label>" +
        "<label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='issues' checked>Issues</li></label>" +
        "<label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='down'>Down</li></label>" +
        "</form></ul></div>";
    }
    else {
        return "<div  id='jq-dropdown-" + y + "' class='jq-dropdown'><ul class='jq-dropdown-menu'>" +
        "<form><label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='up' checked>Up</li></label>" +
        "<label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='issues'>Issues</li></label>" +
        "<label onclick='updateAppStatus(this)'><li><input type='radio' name='radio-group' value='down'>Down</li></label>" +
        "</form></ul></div>";
    }
}

/*
    Function to add an app
 */
function addApp() {
    var appName = document.getElementById("addModalName").value;
    var appStatus = 3;

    // This constructs the JSON object that's passed to NodeJS
    var appInfo = {
        "name": appName,
        "status": appStatus
    };

    $.post('http://localhost:3000/addapp', appInfo);
    checkAppsAdmin();
    localStorage.setItem('update', 'yes');
}

/*
    Function to delete an app
 */
function deleteApp(x) {
    var appID = x.parentNode.parentNode.parentNode.getAttribute("id");

    // This constructs the JSON object that's passed to NodeJS
    var appInfo = {
        "id": appID
    };

    $.post('http://localhost:3000/deleteapp', appInfo);
    checkAppsAdmin();
    localStorage.setItem('update', 'yes');
}

/*
    Function to edit an app
 */
function editApp(x) {
    var appID = x.parentNode.parentNode.parentNode.getAttribute("id");
    var appName = document.getElementById(appID + ".title").textContent;

        // Modal controls - opens and prepopulates fields
    $('#modal1').modal('open');
    document.getElementById("appModalInput").value = appName;
    document.getElementById("appModalID").innerHTML = appID;
}

/*
    Function to edit an app's name
 */
function updateAppName() {
    var name = document.getElementById("appModalInput").value;
    var appID = document.getElementById("appModalID").innerHTML;

    // This constructs the JSON object that's passed to NodeJS
    var appInfo = {
        "id": appID,
        "name": name
    };

    // JQuery AJAX call
    $.post('http://localhost:3000/editappname', appInfo);
    localStorage.setItem('update', 'yes');
    checkAppsAdmin();
}

/*
    Function to update app's status
 */
function updateAppStatus(x) {
    var item = x.parentNode.parentNode.parentNode.getAttribute("id");
    var appID = item.split("jq-dropdown-").pop();

    // Converts word to number
    var val = reverseStatus(x.firstChild.firstChild.getAttribute("value"));

    // This constructs the JSON object that's passed to NodeJS
    var appInfo = {
        "id": appID,
        "item": val
    };

    // JQuery AJAX call
    $.post('http://localhost:3000/editappstatus', appInfo, function(data, status, xhr) {
        //console.log("Status update successfull: " + data + " , " + "Status: " + status + " , " + "xhr: " + xhr)
    });
    localStorage.setItem('update', 'yes');
    checkAppsAdmin();
}

/*
    Function to convert word to number for insertion into database
 */
function reverseStatus(x) {
    if (x === "up") {
        return 3;
    }
    else if (x === "issues") {
        return 2;
    }
    else {
        return 1;
    }
}

/*
    Function to convert number from database into word for table
 */
function appStatus(x) {
    if (x === 1) {
        return "Down";
    }
    else if (x === 2) {
        return "Issues";
    }
    else {
        return "Up";
    }
}