(function() {
    "use_strict";

    var DFPConsoleObject = null;
    
    chrome.runtime.onMessage.addListener(function (msg, sender, response) {

        if (msg.from === 'popup') {

            switch (msg.subject) {
                case "setLocalStorage":
                    window.localStorage.setItem(msg.data.name, msg.data.value);
                    break;
                case "getLocalStorage":
                    var dataStorage = {};
                    for (var i = 0, l = msg.modes.length; i < l; i++) {
                        var ls = window.localStorage.getItem(msg.modes[i]);
                        if (ls) {
                            dataStorage[msg.modes[i]] = ls;
                        }
                    }
                    response(dataStorage);
                    break;
                case "resetLocalStorage":
                    for (var i = 0, l = msg.modes.length; i < l; i++) {
                        window.localStorage.removeItem(msg.modes[i]);
                    }
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
                    response(DFPConsoleObject);
                    break;
            }
        }
    });


    window.addEventListener('message', function (e) {
        var m = e.data.match ? e.data.match(/^dfpStream(.*)/) : null;
        m && DFPOutput(parserDFPConsole(m[1]));
    });

    var parserDFPConsole = function(data) {
        var output = JSON.parse(data);
        output.slotsSort = Object.keys(output.slots).sort(function(a, b) {
            var ar, br;
            ar = output.slots[a].rendered ? output.slots[a].rendered : output.slots[a].renderEnded;
            br = output.slots[b].rendered ? output.slots[b].rendered : output.slots[b].renderEnded;
            return (ar - br);
        });
        DFPComunicator("send", "dfpFinishParse"+JSON.stringify(output.slotsSort), "*");
        return output;
    };

    window.onload = function () {
        setTimeout(function(){
            DFPComunicator("send", "dfpForceConsole", "*");
        },5000);
    };

    var DFPComunicator = function(action, data, domine) {
        window.postMessage(data, domine);
    };

    var DFPOutput = function (output) {

        DFPConsoleObject = output;

        var t = window.performance.timing,
            interactive = t.domInteractive - t.navigationStart,
            load = t.loadEventEnd - t.navigationStart,
            dcl = t.domContentLoadedEventEnd - t.navigationStart;
        load = load<0 ? window.performance.now() : load;

        window.console.clear();

        window.console.log("\n%cDFP Console\n%c by OSP Team\n\n",
            "font-family: Georgia, serif; font-size: 32px; color: #005689",
            "font-family: Helvetica Neue, sans-serif; font-size: 11px; text-decoration: underline; line-height: 1.2rem; color: #767676");

        for (var i=0,l=output.slotsSort.length;i<l;i++) {
            var key = output.slotsSort[i];

            var totalFetch = Math.round(output.slots[key].fetchStarted);
            var totalRendering = Math.round(output.slots[key].renderStarted);
            var totalRendered = Math.round(output.slots[key].rendered);

            window.console.groupCollapsed("%cSlot: [" + key + "] [" + output.slots[key].id + "]",
                "border: 1px solid rgba(0,0,0,0.1);color:"+ (!!totalRendered ? '#3b7bea' : '#c9c9c9') +";background-color: #f5f5f5;height: 30px; padding: 1px 8px;cursor:pointer;");

            window.console.log("%c[" + totalFetch + " ms] %cRecibiendo anuncio.",
                "font-weight:bold;color:#333; padding: 0 1px",
                "color: #555;");
            window.console.log("%c[" + totalRendering + " ms] %cRenderizando anuncio.",
                "font-weight:bold;color:#333; padding: 0 1px",
                "color: #555");
            window.console.log("%c[" + (!!totalRendered ? totalRendered : Math.round(output.slots[key].renderEnded)) + " ms] %cRenderizado de anuncio completado.",
                "font-weight:bold;color:#333; padding: 0 1px",
                "color: #555");

            window.console.log("%c" + (output.slots[key].fetchEnded - output.slots[key].fetchStarted).toFixed(2) + " ms to load%c | %c" + (output.slots[key].renderEnded - output.slots[key].renderStarted).toFixed(2) + " ms to render%c | %c" + (output.slots[key].renderEnded - output.slots[key].fetchStarted).toFixed(2) + " ms total",
                "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px",
                "border:none; background: #fff; font-weight:bold;color:#ddd",
                "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px",
                "border:none; background: #fff; font-weight:bold;color:#ddd",
                "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px");

            window.console.groupEnd();
        }
        window.console.log('\n%cinteractive: ' + (interactive / 1000).toFixed(2) + ' s' +
            '%c | ' +
            '%cload: ' + (load / 1000).toFixed(2) + ' s' +
            '%c | ' +
            '%cDOMContentLoaded: ' + (dcl / 1000).toFixed(2) + ' s',

            "border: 1px solid rgb(255, 204, 52);background-color: rgb(247, 248, 224);padding:1px 8px;",
            "border:none; background: #fff; font-weight:bold;color:#ddd",
            "border: 1px solid rgb(255, 204, 52);background-color: rgb(247, 248, 224);padding:1px 8px;",
            "border:none; background: #fff; font-weight:bold;color:#ddd",
            "border: 1px solid rgb(255, 204, 52);background-color: rgb(247, 248, 224);padding:1px 8px;");
    };

}());
