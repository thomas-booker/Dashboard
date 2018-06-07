/*
    Team Meeting JS functions
    @author Tom Booker
 */


function checkMeeting() {
    $.getJSON('http://localhost:3000/getmeeting', function (res) {
        if (res.Data.length < 1) {
            var caro = "<h4>There is currently no team meeting</h4>";
            document.getElementById("meeting").innerHTML = caro;
        }
        else {

            var caro = "<table class='striped centered' style='font-size: 24px; margin-bottom: 10px;'><thead><tr><th style='width: 40%'>Room</th><th style='width: 30%'>From</th><th style='width: 30%'>To</th></tr></thead><tbody>";

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
            document.getElementById("meeting").innerHTML = caro;
        }
    });
}

function checkMeetingAdmin() {
    $.getJSON('http://localhost:3000/getmeeting', function (res) {
        if (res.Data.length < 1) {
            var caro = "<h4>There is currently no team meeting</h4>";
            document.getElementById("adminMeeting").innerHTML = caro;
        }
        else {
            var caro = "<table class='striped centered' style='margin-bottom: 10px;'><thead><tr><th style='width: 40%'>Title</th><th>From</th><th>To</th><th>Modify</th></tr></thead>";

            for (var i = 0; i < res.Data.length; i++) {

                var datef = new Date(res.Data[i].datefrom);
                var datet = new Date(res.Data[i].dateto);

                caro += "<tr id='" + res.Data[i].id + "'><td><h5 id='" + res.Data[i].id + ".title' >" +
                    res.Data[i].title + "</h5></td><td><p>" + dateConv(datef) + "</p></td>" +
                    "<td><p>" + dateConv(datet) + "</p></td>" +
                    "<td><a class='waves-effect waves-light btn red accent-3' id='delAl' onclick='delMaint(this)'><i class='material-icons'>delete</i></a>" +
                    "<a class='waves-effect waves-light btn red accent-3 openEditBtn' id='maintLoad' onclick='editMaint(this)'><i class='material-icons'>create</i></a></tr>";
            }
            caro += "</table>";
            document.getElementById("adminMeeting").innerHTML = caro;
        }
    });
}