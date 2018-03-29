/*
Module to check if alerts exist
@author Tom booker
 */

// Individual tip retrieval, using random number

function checkTip() {

    $.getJSON('http://localhost:3000/gettips', function (res) {
        var x = JSON.stringify(res);
        var y = JSON.parse(x);
        //document.getElementById("test").innerHTML = x;
        //document.getElementById("test2").innerHTML = res.Data[1].PersonName;

        //var first = 0;
        var last = res.Data.length;
        var num = Math.floor((Math.random() * last));

        //var caro = "<div class='owl-carousel'>";
        var caro = "";

        caro += "<div><h4>" + res.Data[num].tip + "</h4></div>";
        /*for (var i = 0; i < res.Data.length; i++) {
            caro += "<div><h4>" + res.Data[i].tip + "</h4></div>";
        }
        //caro += "</div>";
        console.log(caro);*/
        document.getElementById("tipMsg").innerHTML = caro;

    });
}

function checkTips() {

    $.getJSON('http://localhost:3000/gettips', function (res) {
        var x = JSON.stringify(res);
        var y = JSON.parse(x);
        //document.getElementById("test").innerHTML = x;
        //document.getElementById("test2").innerHTML = res.Data[1].PersonName;


        //var caro = "<div class='owl-carousel'>";
        var caro = "";

        for (var i = 0; i < res.Data.length; i++) {
            caro += "<div><h3>" + res.Data[i].tip + "</h3></div>";
        }
        //caro += "</div>";
        console.log(caro);
        document.getElementById("tipMsg").innerHTML = caro;

    });
}

/*
Check alerts for admin page
 */
function checkTipsAdmin() {

    $.getJSON('http://localhost:3000/gettips', function (res) {
        var caro = "";
        var length = res.Data.Length;
        console.log(length);

        for (var i = 0; i < res.Data.length; i++) {

            caro += "<div class='alertBlock z-depth-2' id='"+ res.Data[i].id +"'><h5 class='alertTitle' id='"+ res.Data[i].id +".title' >" +
                res.Data[i].title + "</h5><p id='"+ res.Data[i].id +".text'>" + res.Data[i].tip +
                "</p><a class='waves-effect waves-light btn cyan lighten-3' id='delAl' onclick='delTip(this)'><i class='material-icons'>delete</i></a>" +
                "<a class='waves-effect waves-light btn cyan lighten-3 openEditBtn' id='alertLoad' onclick='editTip(this)'><i class='material-icons'>create</i></a></div>";
        }
        //caro += "</div>";
        //console.log(caro);
        document.getElementById("tipMsg").innerHTML = caro;

    });
}
/*
Delete alert functions
 */
function delTip(x) {
    var y = x.parentNode.getAttribute("id");

    //var z = y.valueOf();
    //console.log(y);
    deleteTip(y);
}
function deleteTip(tip) {
    var text = {
        "text": tip
    };
    $.post('http://localhost:3000/deletetip', text, function(res) {
        localStorage.setItem('update', 'yes');
        var loc1 = localStorage.getItem('update');
        console.log("Local storage test4post: " + loc1);
        checkTipsAdmin();

    });
}
/*
Edit alert functions
 */
function editTip(x) {
    $("#editTipForm").css("visibility", "visible");
    var y = x.parentNode.getAttribute("id");
    var b = y + ".title";
    var e = y + ".text";
    var c = document.getElementById(b).innerHTML;
    var d = document.getElementById(e).innerHTML;
    console.log(b);
    var a = x.parentNode.getAttribute(b);

    console.log("Tip title: " + c);
    console.log(y);
    $("#tipId").val(y);
    $("#editTitle").val(c);
    $("#editText").val(d);
    localStorage.setItem('update', 'yes');
    var loc1 = localStorage.getItem('update');
    console.log("Local storage test4post: " + loc1);
    //console.log($("#alertId").val());
}
function cancelEdit() {
    $("#tipId").val();
    $("#editTitle").val();
    $("#editText").val();
    $("#editTipForm").css("visibility", "hidden");
}