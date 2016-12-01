window["DFPConsole"] = window["DFPConsole"] || {};
window["DFPConsole"].slots = window["DFPConsole"].slots || {};

var loadDFPConsole = null,
    DFPConsoleLog = function () {
        if (window["DFPConsole"].ready) return;
        loadDFPConsole && clearInterval(loadDFPConsole);
        loadDFPConsole = null;
        var gTags = window["googletag"],
            pAds = gTags.pubads(),
            slots = pAds.getSlots(),
            offsetTime = window["DFPConsole"].offsetTime || 0,
            matchCode = {
                8: "gpt-google_js_loaded",
                46: "gpt-gpt_fetch",
                48: "gpt-gpt_fetched",
                1: "gpt-page_load_complete",
                31: "gpt-queue_start",
                40: "gpt-service_add_slot",
                88: "gpt-service_add_targeting",
                78: "gpt-service_collapse_containers_enable",
                35: "gpt-service_create",
                63: "gpt-service_single_request_mode_enable",
                2: "gpt-slot_create",
                17: "gpt-slot_add_targeting",
                50: "gpt-slot_fill",
                3: "gpt-slot_fetch",
                4: "gpt-slot_receiving",
                53: "gpt-slot_render_delay",
                5: "gpt-slot_rendering",
                6: "gpt-slot_rendered",
                510: "gpt-slot_rendered_load"
            };



        /*var ev = gTags.debug_log.getAllEvents();

        for (var i = 0, l = ev.length; i < l; i++) {
            var ss = ev[i].getSlot ? ev[i].getSlot() : null;
            if ( ss && ss.getSlotElementId() === "div-gpt-ad-portada_m_526feae561fd3d3c3f8b4578" ) {
                console.log(ss.getSlotElementId());
                ss.loaded();

                console.log(
                    (new Date(ev[i].getTimestamp().getTime()) - performance.timing.navigationStart)
                );
                console.log(ev[i].getLevel());
                console.log(ev[i].getMessage());
                console.log(ev[i].getReference());
                console.log(ev[i].getService());
                console.log(ev[i].getMessage().getMessageId());
                console.log("----------------------------------------------");
            }
        }

        console.log("/////////////////////////////////////////////////");*/

        for (var key in slots) {
            var slot = slots[key];
            if (typeof slot === 'function') continue;
            var slotId = slot.getSlotId && slot.getSlotId();
            var rand = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            var id = slotId ? slotId.getId() : rand;
            if (window["DFPConsole"].slots[id] && window["DFPConsole"].slots[id]["fix"]) continue;
            window["DFPConsole"].slots[id] = window["DFPConsole"].slots[id] ||
                {
                    id: slotId.getDomId(),
                    pos: slot.getTargeting(slot.getTargetingKeys()[0])[0],
                    fix: true
                };

            gTags.debug_log.getEventsBySlot(slot).map(function (eventSlot) {
                var time = (new Date(eventSlot.getTimestamp()).getTime()) - performance.timing.navigationStart;

                if("div-gpt-ad-portada_m_526feae561fd3d3c3f8b4578" === eventSlot.getSlot().getSlotId().getDomId()) {
                    /*console.log(matchCode[eventSlot.getMessage().getMessageId()], eventSlot.getMessage().getMessageId(), Math.abs(time - offsetTime), eventSlot.getMessage());*/
                }

                window["DFPConsole"].slots[id][matchCode[eventSlot.getMessage().getMessageId()]] = Math.abs(time - offsetTime);
            });
        }

        setTimeout(function () {
            window["DFPConsole"]["endTime"] = performance.timing.loadEventEnd - performance.timing.navigationStart;
            window["DFPConsole"]["startTime"] = performance.timing.domInteractive - performance.timing.navigationStart;
            window.postMessage("dfpStream" + JSON.stringify(window["DFPConsole"]), "*");
        }, 1000);
        window["DFPConsole"].ready = true;
        return window["DFPConsole"];
    };

function DFPConsoleInit() {
    var tryOn = 0;
    if (!loadDFPConsole) loadDFPConsole = setInterval(function () {        tryOn++;
        console.info("Load extension: DFP Console.");
        if(document.readyState === 'complete' && tryOn >15) {
            DFPConsoleLog();
        }
    }, 1000);

    if( window["DFPConsole"]) {
        window["DFPConsole"].ready = null;
        window["DFPConsole"].offsetTime = window["DFPConsole"].offsetTime || 0;
        var navStart = performance.timing.navigationStart,
            aux = Date.now() - navStart,
            delay = 10000,
            diff = aux - window["DFPConsole"].offsetTime;
        if (diff > delay) {
            window["DFPConsole"].offsetTime = aux;
        }
    }else{
        window["DFPConsole"] = {};
        DFPConsoleInit();
    }
}

function DFPCheckParameters(a) {
    var dfpEnabled = booleanCast(window.localStorage.getItem("dfp_extension_disabled"));
    var disableInitialLoad = booleanCast(window.localStorage.getItem("dfp_disable_initial_load"));
    var singleRequest = booleanCast(window.localStorage.getItem("dfp_single_request"));
    var asyncRendering = booleanCast(window.localStorage.getItem("dfp_async_rendering"));
    if (!dfpEnabled) {
        if (disableInitialLoad !== null) {
            a.U = disableInitialLoad;
        }
        if (singleRequest !== null) {
            a.v = singleRequest;
        }
        if (asyncRendering !== null) {
            a.m = asyncRendering;
        }
    }
    return a;
}

function booleanCast(data) {
    return data == "false" ? false : true;
}

function resetSlotFix() {
    for(var key in window["DFPConsole"].slots) {
        window["DFPConsole"].slots[key]["fix"] = false;
    }
}

window.addEventListener('message', function (e) {
    var showConsole = e.data.match ? e.data.match(/^dfpShowConsole$/) : null;
    var refresh = e.data.match ? e.data.match(/^dfpRefreshAds$/) : null;
    var reload = e.data.match ? e.data.match(/^dfpReload$/) : null;
    var parse = e.data.match ? e.data.match(/^dfpFinishParse(.*)/) : null;
    if(parse) {
        window["DFPConsole"].slotsSort = JSON.parse(parse[1]);
        window["DFPConsole"].parser = true;
    }
    if(refresh) {
        resetSlotFix(), DFPConsoleInit();
        window.googletag.pubads().refresh();
    }
    if(reload) {
        location.reload();
    }
    if(showConsole) {
        window["DFPConsole"].ready=null;
        DFPConsoleLog();
    }
});