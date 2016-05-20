
//(function(window) {

'use strict';

var flagPush = true;
var regArr = Array.prototype.push;
Array.prototype.push = function(e) {

    if(!e) return;

    if (flagPush && window["googletag"] && this == window["googletag"].cmd) {
        flagPush = false;
        dfpc_push();
    }

    if (window["googletag"] && this == window["googletag"].cmd) {
        console.dir(e);
    }
    return regArr.call(this,e);
};

function dfpc_push() {

    regArr.apply(window["googletag"].cmd, function () {

        var DFPConsole = DFPConsole || {slots: {}};

        if (window["googletag"].hasOwnProperty("on") || window["googletag"].hasOwnProperty("off") || window["googletag"].hasOwnProperty("trigger") || window["googletag"].hasOwnProperty("events")) {
            return;
        }

        var old_log = window["googletag"].debug_log.log,
            events = [],
            addEvent = function (name, id, match) {
                events.push({
                    "name": name,
                    "id": id,
                    "match": match
                });
            };
        addEvent("gpt-google_js_loaded", 8, /Google service JS loaded/ig);
        addEvent("gpt-gpt_fetch", 46, /Fetching GPT implementation/ig);
        addEvent("gpt-gpt_fetched", 48, /GPT implementation fetched\./ig);
        addEvent("gpt-page_load_complete", 1, /Page load complete/ig);
        addEvent("gpt-queue_start", 31, /^Invoked queued function/ig);

        addEvent("gpt-service_add_slot", 40, /Associated ([\w]*) service with slot ([\/\w]*)/ig);
        addEvent("gpt-service_add_targeting", 88, /Setting targeting attribute ([\w]*) with value ([\w\W]*) for service ([\w]*)/ig);
        addEvent("gpt-service_collapse_containers_enable", 78, /Enabling collapsing of containers when there is no ad content/ig);
        addEvent("gpt-service_create", 35, /Created service: ([\w]*)/ig);
        addEvent("gpt-service_single_request_mode_enable", 63, /Using single request mode to fetch ads/ig);

        addEvent("gpt-slot_create", 2, /Created slot: ([\/\w]*)/ig);
        addEvent("gpt-slot_add_targeting", 17, /Setting targeting attribute ([\w]*) with value ([\w\W]*) for slot ([\/\w]*)/ig);
        addEvent("gpt-slot_fill", 50, /Calling fillslot/ig);
        addEvent("gpt-slot_fetch", 3, /Fetching ad for slot ([\/\w]*)/ig);
        addEvent("gpt-slot_receiving", 4, /Receiving ad for slot ([\/\w]*)/ig);
        addEvent("gpt-slot_render_delay", 53, /Delaying rendering of ad slot ([\/\w]*) pending loading of the GPT implementation/ig);
        addEvent("gpt-slot_rendering", 5, /^Rendering ad for slot ([\/\w]*)/ig);
        addEvent("gpt-slot_rendered", 6, /Completed rendering ad for slot ([\/\w]*)/ig);


        window["googletag"].events = window["googletag"].events || {};

        window["googletag"].on = function (events, op_arg0, op_arg1) {
            if (!op_arg0) {
                return this;
            }

            events = events.split(" ");

            var dataEvt = op_arg1 ? op_arg0 : undefined,
                callback = op_arg1 || op_arg0, ei = 0, e;

            callback.data = dataEvt;

            for (e = events[ei]; ei < events.length; e = events[++ei]) {
                (this.events[e] = this.events[e] || []).push(callback);
            }
            return this;
        };

        window["googletag"].off = function (events, handler) {
            events = events.split(" ");
            var ei = 0, e, fi = 0, f = function () {
            };

            for (e = events[ei]; ei < events.length; e = events[++ei]) {
                if (!this.events.hasOwnProperty(e)) {
                    continue;
                }

                if (!handler) {
                    delete this.events[e];
                    continue;
                }

                fi = this.events[e].length - 1;
                for (f = this.events[e][fi]; fi >= 0; f = this.events[e][--fi]) {
                    if (f == handler) {
                        this.events[e].splice(fi, 1);
                    }
                }
                if (this.events[e].length === 0) {
                    delete this.events[e];
                }
            }
            return this;
        };

        window["googletag"].trigger = function (event, parameters) {
            if (!this.events[event] || this.events[event].length === 0) {
                return this;
            }
            var parameters = parameters || [], fi = 0, f = this.events[event][fi];

            for (fi, f; fi < this.events[event].length; f = this.events[event][++fi]) {
                if (f.apply(this, [{data: f.data}].concat(parameters)) === false) {
                    break;
                }
            }
            return this;
        };

        window["googletag"].debug_log.log = function (level, message, service, slot, reference) {
            if (message && message.getMessageId && typeof (message.getMessageId()) == 'number') {
                var args = Array.prototype.slice.call(arguments),
                    e = 0;
                for (e; e < events.length; e++) {
                    if (events[e].id === message.getMessageId()) {
                        window["googletag"].trigger(events[e].name, args);
                    }
                }
            }
            return old_log.apply(this, arguments);
        };

        var consoleWatch = setInterval(function (data, gt, count) {
            var maxAttempts = 15;
            window.console.profile("DFP");
            return function () {
                var totalSlots = gt.slot_manager_instance ? Object.keys(gt.slot_manager_instance.l).length : -1;
                if (Object.keys(data.slots).length == totalSlots) {
                    DFPConsole.ready = true;
                    clearInterval(consoleWatch);
                } else {
                    if (count > maxAttempts) {
                        window.console.warn("Hubo un error recuperando la publicidad...");
                        clearInterval(consoleWatch);
                    } else {
                        window.console.info("DFP loading...");
                    }
                }
                count++;
            }
        }(DFPConsole, window["googletag"], 1), 1700);


        var mutationDFP = (function (data) {

            return function (item) {

                var target = document.getElementById(item.m.o);

                if (target) {
                    data.observer = data.observer || {};
                    data.observer[item.w.p[0]] = new MutationObserver(function (mutations) {
                        mutations.forEach(function (mutation) {

                            if (/^(m|r)$/.test(item.w.p[0])) {
                                console.log(item.w.p[0], mutation);
                                console.log(item.w.p[0], window.performance.now());
                            }


                            if (!data.slots[item.w.p[0]].offset2) {
                                data.slots[item.w.p[0]].offset2 = window.performance.now();
                            }

                            if (mutation.type == "attributes") {
                                data.slots[item.w.p[0]].offset = window.performance.now();
                            }
                        });
                    });
                    var config = {attributes: true, childList: true, characterData: true, subtree: true};
                    data.observer[item.w.p[0]].observe(target, config);
                }
            }
        }(DFPConsole));


        /*window["googletag"].on("gpt-google_js_loaded", function (e, level, message, service, slot) {
         console.log("google_js_loaded",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-gpt_fetch", function (e, level, message, service, slot) {
         console.log("gpt_fetch",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-gpt_fetched", function (e, level, message, service, slot) {
         console.log("gpt_fetched",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-page_load_complete", function (e, level, message, service, slot) {
         console.log("page_load_complete",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-queue_start", function (e, level, message, service, slot) {
         console.log("queue_start",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-service_add_slot", function (e, level, message, service, slot) {
         console.log("service_add_slot",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-service_add_targeting", function (e, level, message, service, slot) {
         console.log("service_add_targeting",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-service_collapse_containers_enable", function (e, level, message, service, slot) {
         console.log("service_collapse_containers_enable",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-service_create", function (e, level, message, service, slot) {
         console.log("service_create",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-service_single_request_mode_enable", function (e, level, message, service, slot) {
         console.log("service_single_request_mode_enable",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_create", function (e, level, message, service, slot) {
         console.log("slot_create",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_add_targeting", function (e, level, message, service, slot) {
         console.log("slot_add_targeting",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_fill", function (e, level, message, service, slot) {
         console.log("slot_fill",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_fetch", function (e, level, message, service, slot) {
         console.log("slot_fetch",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_receiving", function (e, level, message, service, slot) {
         console.log("slot_receiving",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_render_delay", function (e, level, message, service, slot) {
         console.log("slot_render_delay",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_rendering", function (e, level, message, service, slot) {
         console.log("slot_rendering",e, level, message, service, slot);
         });
         window["googletag"].on("gpt-slot_rendered", function (e, level, message, service, slot) {
         console.log("slot_rendered",e, level, message, service, slot);
         });*/

        window["googletag"].on("gpt-service_add_slot", function (e, level, message, service, slot) {
            mutationDFP(slot);
        });

        window["googletag"].on("gpt-slot_fetch", function (e, level, message, service, slot) {
            var d = new Date();
            DFPConsole.slots[slot.w.p[0]] = {
                'data': slot.m.o,
                'google_fetch': d.getTime(),
                'fetch': window.performance.now()
            };
        });
        window["googletag"].on("gpt-slot_receiving", function (e, level, message, service, slot) {
            var d = new Date();
            DFPConsole.slots[slot.w.p[0]].google_receiving = d.getTime();
            DFPConsole.slots[slot.w.p[0]].receiving = window.performance.now();
        });
        window["googletag"].on("gpt-slot_rendering", function (e, level, message, service, slot) {

            var d = new Date();
            DFPConsole.slots[slot.w.p[0]].google_rendering = d.getTime();
            DFPConsole.slots[slot.w.p[0]].rendering = window.performance.now();
        });
        window["googletag"].on("gpt-slot_rendered", function (e, level, message, service, slot) {

            var d = new Date();
            DFPConsole.slots[slot.w.p[0]].google_rendered = d.getTime();
            DFPConsole.slots[slot.w.p[0]].rendered = window.performance.now();
        });

        window.addEventListener('load', function (data) {

            return function () {
                var loadData = setInterval(function () {
                    if (data.ready) {
                        DFPOutput(data);
                        clearInterval(loadData);
                        DFPRemoveEvents();
                    }
                }, 10);
            }
        }(DFPConsole));

        var DFPRemoveEvents = (function (gt) {
            return function () {
                if (typeof gt.events !== 'undefined' || typeof gt.off !== 'undefined') {
                    for (var key in gt.events) {
                        gt.off(key);
                    }
                }
            }
        }(window["googletag"]));

        var DFPOutput = function (output) {

            console.dir(output);

            //window.console.clear();

            var t = window.performance.timing,
                interactive = t.domInteractive - t.navigationStart,
                load = t.loadEventEnd - t.navigationStart,
                dcl = t.domContentLoadedEventEnd - t.navigationStart;
            load = load < 0 ? window.performance.now() : load;


            window.console.log("\n%cDFP Console\n%c by OSP Team - v0.1.0\n\n",
                "font-family: Georgia, serif; font-size: 32px; color: #005689",
                "font-family: Helvetica Neue, sans-serif; font-size: 11px; text-decoration: underline; line-height: 1.2rem; color: #767676");

            for (var key in output.slots) {

                if (key != "m" && output.observer[key]) {
                    output.observer[key].disconnect();
                }

                var offset = output.slots[key].offset;
                var offset2 = output.slots[key].offset2;
                var totalFetch = Math.round(output.slots[key].fetch + offset);
                var totalRendering = Math.round(output.slots[key].rendering + offset);
                var totalRendered = Math.round(output.slots[key].rendering + offset);

                window.console.groupCollapsed("%cSlot: [" + key + "] [" + output.slots[key].data + "]",
                    "border: 1px solid rgba(0,0,0,0.1);color:#3b7bea;background-color: #f5f5f5;height: 30px; padding: 1px 8px;cursor:pointer;");
                window.console.log("%c[" + totalFetch + " ms] %cRecibiendo anuncio.",
                    "font-weight:bold;color:#333; padding: 0 1px",
                    "color: #555;");
                window.console.log("%c[" + totalRendering + " ms] %cRenderizando anuncio.",
                    "font-weight:bold;color:#333; padding: 0 1px",
                    "color: #555");
                window.console.log("%c[" + totalRendered + " ms] %cRenderizado de anuncio completado.",
                    "font-weight:bold;color:#333; padding: 0 1px",
                    "color: #555");
                window.console.log("%c" + (output.slots[key].google_receiving - output.slots[key].google_fetch) + " ms to load%c | %c" + (output.slots[key].google_rendered - output.slots[key].google_rendering) + " ms to render%c | %c" + (output.slots[key].google_rendered - output.slots[key].google_fetch) + " ms total",
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

            window["DFPConsole"] = DFPConsole;
        };
    });
}
//}(window));

