/*
Module to check if alerts exist
@author Tom booker
 */

function checkAlerts() {

    $.getJSON('http://localhost:3000/getalerts', function (res) {
        var x = JSON.stringify(res);
        var y = JSON.parse(x);
        //document.getElementById("test").innerHTML = x;
        //document.getElementById("test2").innerHTML = res.Data[1].PersonName;


        //var caro = "<div class='owl-carousel'>";
        var caro = "";

        for (var i = 0; i < res.Data.length; i++) {
            caro += "<div><h3>" + res.Data[i].alertmsg + "</h3></div>";
        }
        //caro += "</div>";
        console.log(caro);
        document.getElementById("alertMsg").innerHTML = caro;

    });
}

/*
Check alerts for admin page
 */
function checkAlertsAdmin() {

    $.getJSON('http://localhost:3000/getalerts', function (res) {
        var caro = "";

        for (var i = 0; i < res.Data.length; i++) {

            caro += "<div class='alertBlock z-depth-2' id='"+ res.Data[i].id +"'><h5 class='alertTitle' id='"+ res.Data[i].id +".title' >" +
                res.Data[i].alerttitle + "</h5><p id='"+ res.Data[i].id +".text'>" + res.Data[i].alertmsg +
                "</p><a class='waves-effect waves-light btn cyan lighten-3' id='delAl' onclick='delItem(this)'><i class='material-icons'>delete</i></a>" +
                "<a class='waves-effect waves-light btn cyan lighten-3 openEditBtn' id='alertLoad' onclick='editAlert(this)'><i class='material-icons'>create</i></a></div>";
        }
        //caro += "</div>";
        //console.log(caro);
        document.getElementById("alertMsg").innerHTML = caro;

    });
}
/*
Delete alert functions
 */
function delItem(x) {
    var y = x.parentNode.getAttribute("id");

    //var z = y.valueOf();
    //console.log(y);
    deleteAlert(y);
}
function deleteAlert(alert) {
    var text = {
        "text": alert
    };
    $.post('http://localhost:3000/deletealert', text, function(res) {
        localStorage.setItem('update', 'yes');
        localStorage.setItem('update', 'yes');
        var loc1 = localStorage.getItem('update');
        console.log("Local storage test4post: " + loc1);
    checkAlertsAdmin();

    });
}
/*
Edit alert functions
 */
function editAlert(x) {
    $("#editAlertForm").css("visibility", "visible");
    var y = x.parentNode.getAttribute("id");
    var b = y + ".title";
    var e = y + ".text";
    var c = document.getElementById(b).innerHTML;
    var d = document.getElementById(e).innerHTML;
    console.log(b);
    var a = x.parentNode.getAttribute(b);

    console.log("Alert title: " + c);
    console.log(y);
    $("#alertId").val(y);
    $("#editTitle").val(c);
    $("#editText").val(d);
    localStorage.setItem('update', 'yes');
    var loc1 = localStorage.getItem('update');
    console.log("Local storage test4post: " + loc1);
    //console.log($("#alertId").val());
}
function cancelEdit() {
    $("#alertId").val();
    $("#editTitle").val();
    $("#editText").val();
    $("#editAlertForm").css("visibility", "hidden");
}