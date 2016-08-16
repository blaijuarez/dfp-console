(function() {
    "use strict";

    chrome.devtools.panels.create("DFP Console",
        null,
        "devtools/panel.html",
        function(sidebar) {
            //sidebar.setObject({some_data: "Some data to show"});
        });
}());