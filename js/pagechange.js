/*
    Function to check state of Team Meeting and Major Emergency
 */

function checkPageChange() {
    $.getJSON('http://localhost:3000/getpagechange', function (res) {
        //console.log(res.Data);
        var tm = res.Data[0].state;
        //console.log(res.Data[0].state);
        var me = res.Data[1].state;

        if (tm === 2) {
            $("#teamMeeting").prop('checked', true);
        }
        else {
            $("#teamMeeting").prop('checked', false);
        }
        //console.log($('#teamMeeting').prop('checked'));

        if (me === 2) {
            $("#majorEmergency").prop('checked', true);
        }
        else {
            $("#majorEmergency").prop('checked', false);
        }
        //console.log($('#majorEmergency').prop('checked'));

    });
}

function updatePageChange(x) {
    var pageID = x.getAttribute("id");
    console.log(pageID);
    var id = pageChangeSwap(x.getAttribute("id"));
    var state = document.getElementById(x.getAttribute("id")).checked;

    console.log(state);
    //console.log(id);
    var pageInfo = {
        "id": id,
        "status": checkState(state)
    };
    $.post('http://localhost:3000/changepage', pageInfo);
    localStorage.setItem('update', pageID);
}


function pageChangeSwap(y) {
    if (y === "teamMeeting") {
        return 1;
    }
    else if (y === "majorEmergency") {
        return 2;
    }
}
function checkState(x) {
    if (x === true) {
        return 2;
    }
    else return 1;
}


/*
    Function to check the  local variable 'loc'
    which is used to tell the dashboard a change has been made
    and that it needs to reload the page
 */
function checkLoc() {
    console.log("Info checked");
    var loc = localStorage.getItem('update');
    console.log(loc);

    if (loc !== null) {
        if (loc === "yes") {
            location.reload();
            console.log("Info checked");
            localStorage.clear();
        }
        else if (loc === "teamMeeting") {
            var tmVis = document.getElementById("teamMeeting").style.visibility;
            console.log("Team Meeting id: " + tmVis);
            if (tmVis === "visible") {
                console.log("ME VISIBLE");
                document.getElementById("teamMeeting").setAttribute("style", "visibility: hidden");
                localStorage.clear();
            }
            else if (tmVis === "hidden") {
                console.log("ME HIDDEN");
                document.getElementById("teamMeeting").setAttribute("style", "visibility: visible");
                localStorage.clear();
            }
        }
        else if (loc === "majorEmergency") {
            var meVis = document.getElementById("majorEmergency").style.visibility;
            console.log("Major emergency Meeting id: " + meVis);

            if (meVis === "visible") {
                console.log("ME VISIBLE");
                document.getElementById("majorEmergency").setAttribute("style", "visibility: hidden");
                localStorage.clear();
            }
            else if (meVis === "hidden") {
                console.log("ME HIDDEN");
                document.getElementById("majorEmergency").setAttribute("style", "visibility: visible");
                localStorage.clear();
            }
        }
    }
}