(function() {
    "use strict";

    var millisecondsPerCentury = 1000 * 60 * 60 * 24 * 7 * 30 * 12 * 100;
    var oneCenturyAgo = (new Date()).getTime() - millisecondsPerCentury;

    chrome.runtime.onMessage.addListener(
        function(request) {
            if (request.action == "removeUserBrowserData") {
                chrome.browsingData.remove({
                    "since": oneCenturyAgo,
                    "originTypes": {
                        "unprotectedWeb": true
                    }
                }, {
                    "cache": true,
                    "cookies": true
                }, null);
            }
        });


//////////////////////////////////////////////////////////

    chrome.webRequest.onBeforeRequest.addListener(
        function (response) {
            if (/^.+(gpt\/pubads_impl.+)\.js$/.test(response.url)) {
                var redirect = {};
                redirect.redirectUrl =  chrome.extension.getURL('scripts/pubads_impl_90.js');
                return redirect;
            }
        },
        {urls: ["*://*.googleadservices.com/*"], types: ["script"]},
        ["blocking"]);


//////////////////////////////////////////////////////////

    var connections = {};

    chrome.runtime.onConnect.addListener(function (port) {
        function extensionListener(message, sender, sendResponse) {

            if (message.from && message.from == "init-dfp") {
                connections[message.tabId] = port;
            }

            if (message.from && message.from == "devtools") {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true
                }, function (tabs) {
                    for (var tab in tabs) {
                        chrome.tabs.sendMessage(tabs[tab].id, message);
                    }
                });
            }
        }

        port.onMessage.addListener(extensionListener);

        port.onDisconnect.addListener(function(port) {
            port.onMessage.removeListener(extensionListener);

            var tabs = Object.keys(connections);
            for (var i=0, len=tabs.length; i < len; i++) {
                if (connections[tabs[i]] == port) {
                    delete connections[tabs[i]];
                    break;
                }
            }
        });
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (sender.tab) {
            var tabId = sender.tab.id;
            if (tabId in connections) {
                connections[tabId].postMessage(request);
            }
        }
        return true;
    });
}());