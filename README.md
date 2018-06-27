# ITHelp Dashboard
---
The ITHelp Dashboard is a RESTful application using MVC architecture.

The various parts of the MVC are:
- MySQL 'Model'
- HTML pages 'View'
- NodeJS 'Controller'

The dashboard has two main parts; the main dashboard and the admin panel. Adding, editing and deleting applications and maintenance messages can be done via the admin panel without the need to code.

### RESTful / MVC
---
The main point of using MVC is for security, to seperate the view from the model - in this case, not allowing the website, and by extension website visitors, direct access to the database.

Therefore a server sits between the website and database, and for this I have used NodeJS.

The dashboard makes RESTful calls to the NodeJS server, which in turn makes the request to the MySQL database. If it was a retrieve request, NodeJS then converts the data to JSON and returns it to the page that requested it.

Requests are made by making a call to NodeJS, eg http://localhost:XXXX/getmaint

A JavaScript function then loops through the data and populates the page that requested it.

### JavaScript / JQuery
---
JQuery is being used mainly for AJAX calls ($.getJSON/ $.POST), and also for page load events ($(document).on();).

JavaScript is being used mainly to populate pages with data from the datebase. EG when the dashboard loads it runs two JavaScript functions:

- checkMaint()
- checkApps()

checkMaint() makes a GET request to the NodeJS server, which in turn retrieves maintenance messages from the database. The function then loops through the results and populates a div on the dashboard that has the ID "maintHomeMsg" with a table of the results. If there are no maintenance messages, it will instead display a message saying as such.

checkApps() does the same, except populating a div with the ID "appHomeMsg".

### MaterializeCSS / Responsive design
---
The dashboard uses [Materialize], a library built on Bootstrap, to provide the responsive container the dashboard is built on. This means that in the future, if the dashboard can be used on work devices, inc mobile devices, very little work (if any at all) will be required.

Using this has caused some conflicts however: eg, radio buttons don't seem to work properly. There is a section in styles.css that overrides those parts of Materialize that don't work properly.

### NodeJS
---
The NodeJS server was creating using PHPStorm, which has seperated the server code from the mappings.

The server sits in the file 'www', and the mappings sit in 'index.js'. The server is started by running the 'www' file. There is a .bat file on the desktop that will run it.

The mappings are set up by function area, i.e. "Maintenance", "Applications" etc. In hindsight I could've written far fewer functions and used smaller functions to return the correct MySQL query, however being new and self-taught I didn't realise this when I started.

NodeJS is also a local installation in order for the server to work.

### MySQL
---

The MySQL server runs at system startup and shouldn't need touching. You can view it by clicking on its icon, clicking 'Manage Instance', and then clicking on 'Local instance'.

For security I will not be naming the Schema or table names in this Readme, however after opening the editor it should be straight forward working it out.

### Tools used
---
A list of tools, frameworks, libraries etc used:
| Tool | Link |
|------|------|
|NodeJS|[NodeJS]|
|Materialize|[Materialize]|
|MySQL|[MySQL]|
|JQuery|[JQuery]|
|HTML/CSS/JavaScript|[HTML/CSS/JavaScript]|

### Instructions
---
- Start the NodeJs server by running 'RUNSERVER.bat' on the desktop. 
- Open Google Chrome and click the dashboard favourite.
- To administer, open a seperate window and go to the dashboard admin favourite.
- After moving the dashboard to the correct monitor, and ensuring the TV is plugged in, click F11 to make the dashboard full screen.

### Author
---
This dashboard was created by [Thomas Booker].

[Materialize]: <https://materializecss.com/>
[NodeJS]: <https://nodejs.org/en/>
[MySQL]: <https://www.mysql.com>
[JQuery]: <https://www.jquery.com>
[HTML/CSS/JavaScript]: <https://www.w3schools.com>
[Thomas Booker]: <https://github.com/thomas-booker>
