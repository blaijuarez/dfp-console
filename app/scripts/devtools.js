chrome.devtools.panels.create("DFPConsole", "images/icon128.png", "panel.html", function (panel) {
});


// SIEMPRE ESCUCHANDO...
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name == "dfp-console-port"){
        port.onMessage.addListener(function(msg) {
            alert("siempre devtools:", msg);
        });
    }
});