/*
Module to update ITHelp Team Information
@author Tom Booker
 */


function getTeamInfo() {

    var info;

    $.getJSON('http://localhost:3000/getteaminfo', function (res) {
        var info = "<div class='itInfo'>";

        for (var i = 0; i < res.Data.length; i++) {
            info += "<p id='childP'>" + res.Data[i].info + "</p>";
        }
        info += "</div>";


    });
    return info;
}


function checkTeamInfo() {

    $.getJSON('http://localhost:3000/getteaminfo', function (res) {
        //var x = JSON.stringify(res);
        //var y = JSON.parse(x);
        //document.getElementById("test").innerHTML = x;
        //document.getElementById("test2").innerHTML = res.Data[1].PersonName;


        //var caro = "<div class='owl-carousel'>";
        var info = "<div id='tmInfo' class='itInfo'><h4>";

        for (var i = 0; i < res.Data.length; i++) {
            info += res.Data[i].info;
        }
        info += "</h4></div>";
        //console.log(info);
            document.getElementById("teamInfo").innerHTML = info;

    });
}

function putTeamInfo(req) {
    console.log(req);
    $.post("http://localhost:3000/putteaminfo", req);
    localStorage.setItem('update', 'yes');
    var loc1 = localStorage.getItem('update');
    console.log("Local storage test4post: " + loc1);

    //setTimeout(checkTeamInfo());
}