/*
Updating local storage to trigger homepage refresh
 */

function updateLocalStorage() {
    localStorage.setItem('update', 'yes');
    var loc1 = localStorage.getItem('update');
    console.log("Local storage test4post: " + loc1);
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




