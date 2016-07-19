(function() {
    "use_strict";

    var DFPConsoleObject = null;
    
    chrome.runtime.onMessage.addListener(function (msg, sender, response) {

        if (msg.from === 'popup') {

            switch (msg.subject) {
                case "getLocalStorage":
                    break;
                case "setLocalStorage":
                    window.localStorage.setItem(msg.data.name, msg.data.value);
                    break;
                case "removeLocalStorage":
                    window.localStorage.removeItem(msg.data.name);
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
            }

            if(response) {
                var dataStorage = returnLocalStorage(msg.modes);
                response(dataStorage);
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
        }
    });

    window.addEventListener('message', function (e) {
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
            DFPOutput(response);
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

    window.onload = function () {
        DFPForceConsole();
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

            var totalFetch = Math.round(output.slots[key]["gpt-slot_fetch"]),
                totalRendering = Math.round(output.slots[key]["gpt-slot_rendering"]),
                totalRendered = Math.round(output.slots[key]["gpt-slot_rendered_load"]),
                totalRenderedFake = (!!totalRendered ? totalRendered : Math.round(output.slots[key]["gpt-slot_rendered"]));

            var g_load = (output.slots[key]["gpt-slot_receiving"] - output.slots[key]["gpt-slot_fetch"]).toFixed(2),
                g_render = (output.slots[key]["gpt-slot_rendered"] - output.slots[key]["gpt-slot_rendering"]).toFixed(2),
                g_total = (output.slots[key]["gpt-slot_rendered"] - output.slots[key]["gpt-slot_fetch"]).toFixed(2);

            window.console.groupCollapsed("%c" + output.slots[key].pos + ": [" + output.slots[key].id + "]",
                "border: 1px solid rgba(0,0,0,0.1);color:" + (!!totalRendered ? '#3b7bea' : '#c9c9c9') + ";background-color: #f5f5f5;height: 30px; padding: 1px 8px;cursor:pointer;");

            if(totalFetch && totalRendering && totalRenderedFake) {
                window.console.log("%c[" + totalFetch + " ms] %cRecibiendo anuncio.",
                    "font-weight:bold;color:#333; padding: 0 1px",
                    "color: #555;");
                window.console.log("%c[" + totalRendering + " ms] %cRenderizando anuncio.",
                    "font-weight:bold;color:#333; padding: 0 1px",
                    "color: #555");
                window.console.log("%c[" + totalRenderedFake + " ms] %cRenderizado de anuncio completado.",
                    "font-weight:bold;color:#333; padding: 0 1px",
                    "color: #555");

                window.console.log("%c" + g_load + " ms to load%c | %c" + g_render + " ms to render%c | %c" + g_total + " ms total",
                    "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px",
                    "border:none; background: #fff; font-weight:bold;color:#ddd",
                    "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px",
                    "border:none; background: #fff; font-weight:bold;color:#ddd",
                    "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px");
            }else{
                window.console.log("%cNo se han obtenido datos para este slot.",
                    "font-weight:bold;color:#333; padding: 0 1px");
            }

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
