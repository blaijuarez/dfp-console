// SOLO UNA VEZ...
chrome.extension.onMessage.addListener(function(request, sender, callback) {
    switch(request.type) {
        case "print":
            alert("solo una vez background:");
            break;
    }
    return true;
});


// SIEMPRE ESCUCHANDO...
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name == "dfp-console-port"){
        port.onMessage.addListener(function(msg) {
            alert("siempre background:", msg);
        });
    }
});