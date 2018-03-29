/*
Updating local storage to trigger homepage refresh
 */

function updateLocalStorage() {
    localStorage.setItem('update', 'yes');
    var loc1 = localStorage.getItem('update');
    console.log("Local storage test4post: " + loc1);
}



