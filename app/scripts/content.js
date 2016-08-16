(function() {
    "use strict";

    var DFPConsoleObject = null;
    var storageAPI = window["storageAPI"] || {};

    chrome.runtime.onMessage.addListener(function (message, sender, response) {

        if (message.from === 'devtools') {
            switch (message.subject) {
                case "getDFPConsoleObject":
                    chrome.extension.sendMessage(DFPConsoleObject);
                    break;
            }
        }

        if (message.from === 'popup') {

            switch (message.subject) {
                case "getLocalStorage":
                    break;
                case "setLocalStorage":
                    window.localStorage.setItem(message.data.name, message.data.value);
                    break;
                case "removeLocalStorage":
                    window.localStorage.removeItem(message.data.name);
                    break;
                case "refreshAds":
                    DFPComunicator("send", "dfpRefreshAds", "*");
                    break;
                case "reload":
                    DFPComunicator("send", "dfpReload", "*");
                    break;
                case "showConsole":
                    DFPComunicator("send", "dfpShowConsole", "*");
                    break;
                case "getDFPConsoleObject":
                    response({DFPConsoleObject:DFPConsoleObject,origin:document.origin});
                    response = null;
                    break;
                case "removeAllLogs":
                    DFPComunicator("send", "removeAllLogs", "*");
                    break;
                case "reloadPage":
                    location.reload();
                    break;
                case "showReportDB":
                    DFPComunicator("send", "getAllLogs", "*");
                    break;
            }

            if(response) {
                var dataStorage = returnLocalStorage(message.modes);
                response(dataStorage);
            }
        }

        function returnLocalStorage(data) {

            if(!data){
                return null
            }

            var dataStorage = {};
            for (var i = 0, l = data.length; i < l; i++) {
                var ls = window.localStorage.getItem(data[i]);
                if (ls) {
                    dataStorage[data[i]] = ls;
                }
            }
            return dataStorage;
        }
    });

    window.addEventListener('message', function (e) {

        if(e.data && e.data.from && e.data.from=="devtools") {
            switch (e.data.subject) {
                case "getDFPConsoleObject":
                    alert("content");
                    chrome.runtime.sendMessage(DFPConsoleObject);
                    break;
            }
        }

        var m = e.data.match ? e.data.match(/^dfpStream(.*)/) : null;
        if(!m) return;

        var data = parserDFPConsole(m[1]);
        var q = new Promise(
            function(resolve) {
                DFPComunicator("send", "dfpFinishParse"+JSON.stringify(data.slotsSort), "*");
                resolve(data);
            }
        );

        q.then(function(response) {
            DFPConsoleObject = response;
        });
    });

    var parserDFPConsole = function(data) {
        var output = JSON.parse(data);
        output.slotsSort = Object.keys(output.slots).sort(function(a, b) {
            var ar, br;
            ar = output.slots[a]["gpt-slot_rendered_load"] ? output.slots[a]["gpt-slot_rendered_load"] : output.slots[a]["gpt-slot_rendered"];
            br = output.slots[b]["gpt-slot_rendered_load"] ? output.slots[b]["gpt-slot_rendered_load"] : output.slots[b]["gpt-slot_rendered"];

            return (ar - br);
        });
        return output;
    };

    var DFPComunicator = function(action, data, domine) {
        window.postMessage(data, domine);
    };

    var DFPForceConsole = function () {
        setTimeout(function() {
            if (DFPConsoleObject && !DFPConsoleObject.ready) {
                DFPComunicator("send", "dfpShowConsole", "*");
            }
        },5000);
    };

    var DFPLogMode = function () {
        //chrome.runtime.sendMessage({action: "removeUserBrowserData"}, null);
        (function injector(libs) {
            var s = document.createElement('script');
            s.src = chrome.extension.getURL(libs.shift());
            s.onload = function() {libs.length>0 && injector(libs)};
            (document.head || document.documentElement).appendChild(s);
        }(['scripts/storageAPI.js','scripts/metrics.js']));
    };

    window.onload = function () {
        DFPForceConsole();
        var logMode = window.localStorage.getItem("dfp_log_mode");
        logMode && logMode !== "false" && DFPLogMode();
    };

}());
