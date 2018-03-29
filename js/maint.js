/*
    Maint.html JS functions
    @author Tom Booker
 */

function checkMaintAdmin() {
    $.getJSON('http://localhost:3000/getmaint', function (res) {
        var caro = "";

        for (var i = 0; i < res.Data.length; i++) {

            var datef = new Date(res.Data[i].datefrom);
            var datet = new Date(res.Data[i].dateto);

            caro += "<div class='alertBlock z-depth-2' id='"+ res.Data[i].id +"'><h5 class='alertTitle' id='"+ res.Data[i].id +".title' >" +
                res.Data[i].title + "</h5><p id='"+ res.Data[i].id +".text'>" + res.Data[i].msg + "</p><h5>Date from:</h5><p>" +
                dateConv(datef) + "<h5>Date to:</h5><p>" + dateConv(datet) +
                "</p><a class='waves-effect waves-light btn cyan lighten-3' id='delAl' onclick='delMaint(this)'><i class='material-icons'>delete</i></a>" +
                "<a class='waves-effect waves-light btn cyan lighten-3 openEditBtn' id='maintLoad' onclick='editMaint(this)'><i class='material-icons'>create</i></a></div>";
        }
        document.getElementById("maintMsg").innerHTML = caro;

    });
}

function dateConv(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var day = date.getDay();
    var month = date.getMonth();
    var seconds = date.getTime();
    var hrs = date.getHours();
    var mins = (date.getMinutes()<10?'0':'') + date.getMinutes();
    return hrs + ":" + mins + ", " + days[day] + ", " + date.getDate() + " " + months[month] + " " + date.getFullYear();
}
/*
Edit maintenance functions
 */
function editMaint(x) {
    $("#editMaintForm").css("visibility", "visible");
    var y = x.parentNode.getAttribute("id");
    var b = y + ".title";
    var e = y + ".text";
    var c = document.getElementById(b).innerHTML;
    var d = document.getElementById(e).innerHTML;
    console.log(b);
    var a = x.parentNode.getAttribute(b);

    //console.log("Maintenance title: " + c);
    //console.log(y);
    $("#maintId").val(y);
    $("#maintTitle").val(c);
    $("#maintText").val(d);
    localStorage.setItem('update', 'yes');
    var loc1 = localStorage.getItem('update');
    console.log("Local storage test4post: " + loc1);
    //console.log($("#alertId").val());
}
function cancelMaintEdit() {
    $("#MaintId").val();
    $("#maintTitle").val();
    $("#maintText").val();
    $("#editMaintForm").css("visibility", "hidden");
}
function delMaint(x) {
    var y = x.parentNode.getAttribute("id");
    console.log("Delete test");
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
        localStorage.setItem('update', 'yes');
        var loc1 = localStorage.getItem('update');
        console.log("Local storage test4post: " + loc1);
        checkMaintAdmin();
    });
}