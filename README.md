dfp-console
======================
DFP Console born with the need to measure the times of advertising campaigns set to real-time rendering browser.

DFP Console is an extension for Google Chrome browser. With it you can measure the time from the first resource request, until the end of its rendering. With the possibility to see the data in a timeline graph, create reports or export a csv file.

Features:
- Get a complete listing of all slots subscribed to DFP.
- Changes to flight DFP configuration of any supported web.
- Create a report of the samples you want.
- Exports data!

![Screenshot](https://github.com/blaijuarez/dfp-console/blob/master/gfx/screenshots/1.png?raw=true)
![Screenshot](https://github.com/blaijuarez/dfp-console/blob/master/gfx/screenshots/2.png?raw=true)
![Screenshot](https://github.com/blaijuarez/dfp-console/blob/master/gfx/screenshots/3.png?raw=true)
![Screenshot](https://github.com/blaijuarez/dfp-console/blob/master/gfx/screenshots/4.png?raw=true)

Installation
------------

###### If you are a developer:

Clone the repository on your local machine:

    git clone https://github.com/blaijuarez/dfp-console.git
    cd dfp-console

Generate the installer using the command:

    npm install
    gulp

> **Note**: You need to have installed `Nodejs` and `npm`. For more details, see [documentation](https://docs.npmjs.com/getting-started/installing-node).

That's it!

###### If you're not a developer:

This is the compressed file containing all necessary for proper operation code.
[Download the extension](https://github.com/blaijuarez/dfp-console/blob/master/gfx/dfp-console.crx).


Usage
------------

###### Sample results in devtool:
Access a website that has configured DFP. Open devtool panel (F12) and click on the `DFP Console` tab. Click the button to see the results.

###### Change settings DFP:
If you click on the icon (top right), the configuration panel will be displayed. In this section you can change the settings and behaviors of advertising DFP. By default is disabled. Click on the red button to activate. The options are:

+ Toggle the disableInitialLoad mode.
+ Change requests to the fetch creatives. You can switch between single and multi request.
+ You can switch the type between asynchronous and synchronous rendering.

If you have enabled disableInitialLoad, you can force the fetch clicking on the `ads Refresh` button.

###### See the results on the timeline:
You can see a graph of the time it takes the activities since the first resource is requested, until the last item is rendered by clicking on the button `stats`.

###### Export samples:
To activate the report mode, click on the icon file.
Enter the number of samples you want and press the `go` button! Once finished, you can export the data to a .csv file.

> Note: If you use a AdBlocker, disable it.

Bugs and Features
-----------------

If you found a bug or have a feature request, please create an issue here on GitHub. Your prayers will be heard! ;)

https://github.com/blaijuarez/dfp-console/issues

Changelog
---------

### 0.4.1 ###

+ Improve styles tab content.
+ Added load info on devtool.

### 0.4.0 ###

+ New tab for devtool.
+ It has been deleted data slots of the console. Now, they displayed in the 'DFP Console' tab.
+ New option to export reports to a .csv file.

### 0.3.1 ###

+ Fixed problem with indexdDB when a table is created for the first time.

### 0.3.0 ###

+ New report option.
+ New user interface in the popup window.
+ IndexedDB use to store the logs reported.
+ Improved state and configuration using localStorage.
+ The order of holes matches with the rendering time.

### 0.2.1 ###

+ Fixed problem with async mode.

### 0.2.0 ###

+ New timeline window.
+ New Background comunication.
+ Force the console output when synchronization is lost with DFP.
+ Improves force data.
+ The slots are arranged in order of rendering.
+ New panel to set the parameters on the fly for DFP.
+ Integrated pubads with parameters.
+ Added global reset for the parameters.

### 0.1.0 ###

+ List of Slots defined in DFP with their relative times.
+ Displayed data in the 'console' tab of devtool.

Author
------

**Blai Juárez**

+ https://github.com/blaijuarez
+ https://twitter.com/blaijuarez
+ https://es.linkedin.com/in/blaijuarez

License
-------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.