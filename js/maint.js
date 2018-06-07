/*
    Maint.html JS functions
    @author Tom Booker
 */

function checkMaint() {
    $.getJSON('http://localhost:3000/getmaint', function (res) {
        if (res.Data.length < 1) {
            console.log("No planned maintenance");
            var caro = "<h4>There is currently no maintenance planned</h4>";
            document.getElementById("maintHomeMsg").innerHTML = caro;
        }
        else {

            var caro = "<table class='striped centered' style='font-size: 24px; margin-bottom: 10px;'><thead><tr><th style='width: 40%'>Title</th><th style='width: 30%'>From</th><th style='width: 30%'>To</th></tr></thead><tbody>";

            for (var i = 0; i < res.Data.length; i++) {

                var datef = new Date(res.Data[i].datefrom);
                var datet = new Date(res.Data[i].dateto);

                /*caro += "<div id='"+ res.Data[i].id +"'><h5 class='alertTitle' id='"+ res.Data[i].id +".title' style='float: left;'>" +
                    res.Data[i].title + "</h5><p id='"+ res.Data[i].id +".text' style='float: left;'>" + res.Data[i].msg + "</p><h5 style='float: right;'>Date from:</h5><p style='float: right;'>" +
                    dateConv(datef) + "<h5 style='float: right;'>Date to:</h5><p style='float: right;'>" + dateConv(datet) + "</div>";*/

                caro += "<tr id='" + res.Data[i].id + "'><td><h5>" + res.Data[i].title + "</h5></td>" +
                    "<td>" + dateConv(datef) + "</td><td>" + dateConv(datet) + "</td></tr>";

            }
            caro += "</table>";
            document.getElementById("maintHomeMsg").innerHTML = caro;
        }
    });
}

function checkMaintAdmin() {
    $.getJSON('http://localhost:3000/getmaint', function (res) {
        if (res.Data.length < 1) {
            console.log("No planned maintenance");
            var caro = "<h4>There is currently no maintenance planned</h4>";
            document.getElementById("maintMsg").innerHTML = caro;
        }
        else {
            var caro = "<table class='striped centered' style='margin-bottom: 10px;'><thead><tr><th style='width: 40%'>Title</th><th>From</th><th>To</th><th>Modify</th></tr></thead>";

            for (var i = 0; i < res.Data.length; i++) {

                var datef = new Date(res.Data[i].datefrom);
                var datet = new Date(res.Data[i].dateto);

                caro += "<tr id='" + res.Data[i].id + "'><td><h5 id='" + res.Data[i].id + ".title' >" +
                    res.Data[i].title + "</h5></td><td><p>" + dateConv(datef) + "</p></td>" +
                    "<td><p>" + dateConv(datet) + "</p></td>" +
                    "<td><a class='waves-effect waves-light btn red accent-3 openEditBtn' id='maintLoad' onclick='editMaint(this)'><i class='material-icons'>create</i></a>" +
                    "<a class='waves-effect waves-light btn red accent-3' id='delAl' onclick='delMaint(this)'><i class='material-icons'>delete</i></a></tr>";
            }
            caro += "</table>";
            document.getElementById("maintMsg").innerHTML = caro;
        }
    });
}


/*
Edit maintenance functions
 */
function editMaint(x) {
    console.log(x.parentNode.parentNode);
    var appID = x.parentNode.parentNode.getAttribute("id");
    var appName = document.getElementById(appID + ".title").textContent;

    // Modal controls - opens and prepopulates fields
    $('#modal2').modal('open');
    document.getElementById("maintTitle").value = appName;
    document.getElementById("maintModalID").innerHTML = appID;
}

function updateMaint() {
    var title = document.getElementById("maintTitle").value;
    var appID = document.getElementById("maintModalID").innerHTML;
    var datef = document.getElementById("maintDateF").value;
    var datet = document.getElementById("maintDateT").value;
    var timef = document.getElementById("maintTimeF").value;
    var timet = document.getElementById("maintTimeT").value;

    //console.log("Name: " + title + ", ID: " + appID + ", Date from: " + datef + ", Time from: " + timef + ", Date to: " + datet + ", Time to: " + timet);

    var maintInfo = {
        "id": appID,
        "title": title,
        "datef": datef,
        "datet": datet,
        "timef": timef,
        "timet": timet
    };

    // JQuery AJAX call
    $.post('http://localhost:3000/editmaint', maintInfo);
    localStorage.setItem('update', 'yes');
    checkMaintAdmin();
}

function delMaint(x) {
    var y = x.parentNode.parentNode.getAttribute("id");
    console.log("Delete test: " + x.parentNode.parentNode.getAttribute("id"));
    //var z = y.valueOf();
    //console.log(y);
    deleteMaint(y);
}
function deleteMaint(maint) {
    var text = {
        "text": maint
    };
    $.post('http://localhost:3000/deletemaint', text, function(res) {
        localStorage.setItem('update', 'yes');
        var loc1 = localStorage.getItem('update');
        console.log("Local storage test4post: " + loc1);
        checkMaintAdmin();
    });
}