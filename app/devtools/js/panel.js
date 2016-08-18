(function() {
    "use strict";

    var port = chrome.runtime.connect({
            name: "devtools-panel"
        }),

        DFPOutput = function (output) {

            var t = window.performance.timing,
                interactive = t.domInteractive - t.navigationStart,
                load = t.loadEventEnd - t.navigationStart,
                dcl = t.domContentLoadedEventEnd - t.navigationStart;
            load = load < 0 ? window.performance.now() : load;


            var container = document.getElementById("print_dfp_console");
            var template = null;

            container.innerHTML = "";

            for (var i = 0, l = output.slotsSort.length; i < l; i++) {
                var key = output.slotsSort[i];
                var totalFetch = Math.round(output.slots[key]["gpt-slot_fetch"]),
                    totalRendering = Math.round(output.slots[key]["gpt-slot_rendering"]),
                    totalRendered = Math.round(output.slots[key]["gpt-slot_rendered_load"]),
                    totalRenderedFake = (!!totalRendered ? totalRendered : Math.round(output.slots[key]["gpt-slot_rendered"]));

                var g_load = (output.slots[key]["gpt-slot_receiving"] - output.slots[key]["gpt-slot_fetch"]).toFixed(2),
                    g_render = (output.slots[key]["gpt-slot_rendered"] - output.slots[key]["gpt-slot_rendering"]).toFixed(2),
                    g_total = (output.slots[key]["gpt-slot_rendered"] - output.slots[key]["gpt-slot_fetch"]).toFixed(2);

                template = '<li class="has-sub">' +
                    '<a' +
                    (!!totalRendered ? '' : ' class="fail"') +
                    '><span><i class="fa fa-fw fa-clock-o"></i> ' +
                    output.slots[key].pos + ' - [ ' + output.slots[key].id + ' ]' +
                    '</span></a><ul><li><a>';

                if (totalFetch && totalRendering && totalRenderedFake) {
                    template += '<span class="yellow">[ ' +
                        totalFetch + ' ms ]' +
                        '</span> <span>Recibiendo anuncio</span></a></li><li><a><span class="yellow">[ ' +
                        totalRendering + ' ms ]' +
                        '</span> <span>Renderizando anuncio</span></a></li><li><a><span class="yellow">[ ' +
                        totalRenderedFake + ' ms ]' +
                        '</span> <span>Renderizado completo</span></a></li><li><a><span>' +
                        g_load + ' ms' +
                        '<div class="tooltip right"><div class="tooltip-arrow"></div>' +
                        '<div class="tooltip-inner">to load</div></div></span><span>' +
                        g_render+ ' ms' +
                        '<div class="tooltip right"><div class="tooltip-arrow"></div>' +
                        '<div class="tooltip-inner">to render</div></div></span><span>' +
                        g_total + ' ms' +
                        '<div class="tooltip right">' +
                        '<div class="tooltip-arrow"></div>' +
                        '<div class="tooltip-inner">total</div>' +
                        '</div></span>';
                } else {
                    template += '<span>No se han obtenido datos para este slot.</span>';
                }

                template += '</a></li></ul></li>';
                container.innerHTML += template;
            }

            addHandlers();


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

    port.postMessage({
        from: "init-dfp",
        tabId: chrome.devtools.inspectedWindow.tabId
    });

    port.onMessage.addListener(function (message, sender, sendResponse) {
        DFPOutput(message);
    });

    window.onload = function() {
        document.getElementById("btn_getConsole").onclick = function() {
            port.postMessage({
                from: "devtools",
                subject: "getDFPConsoleObject"
            });
        };
    };

    var btn_Reload = document.getElementById("btn_getConsole");
    btn_Reload.onclick = function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    from: "devtools",
                    subject: "getDFPConsoleObject"
                }, function(){alert("callback")});
        });
    };

    var addHandlers = function() {
        var btns_Collapse = [].slice.call(document.getElementsByClassName("has-sub"));
        btns_Collapse.forEach(function(btn) {
            btn.onclick = function (evt) {
                var collapse = {},
                    i = 0;
                do {
                    collapse = btn.children[i];
                    i++;
                }
                while (collapse && collapse.tagName != "UL");
                $(btn).toggleClass("open");
                $(collapse).slideToggle();
            }
        });
    };
})();