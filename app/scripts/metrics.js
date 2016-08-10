(function(func) {
    "use strict";

    window["DBConfig"] = {
        db: "OSP-Report",
        table: "DFP-Log",
        key: "htmlResponse",
        maxReload: parseInt(window.localStorage.getItem("dfp_num_log_mode")) || 10
    };
    var metricas = {},
        registrarMetricas = function () {

            var t = performance.timing,
                onlyOne = true;
                metricas.htmlResponse = t.responseEnd - t.navigationStart;
                metricas.domBuilt = t.domInteractive - t.navigationStart;
                metricas.cssomBuilt = t.domContentLoadedEventEnd - t.navigationStart;
                metricas.pageReady = t.domComplete - t.navigationStart;
                metricas.pageEnd = t.loadEventEnd - t.navigationStart;

            try {
                for (var i = 0, l = DFPConsole.slotsSort.length; i < l; i++) {
                    var key = DFPConsole.slotsSort[i];
                    var rendered = DFPConsole.slots[key]["gpt-slot_rendered_load"] ? Math.round(DFPConsole.slots[key]["gpt-slot_rendered_load"]) : Math.round(DFPConsole.slots[key]["gpt-slot_rendered"]);
                    if (key == "m" || key == "si" || key == "sd" || key == "r") {
                        if (onlyOne) {
                            onlyOne = false;
                            metricas.firstKeyAdRendered = rendered;
                        } else {
                            metricas.LastKeyAdRendered = rendered;
                        }
                    }
                    if (i === Object.keys(DFPConsole.slots).length - 1) {
                        metricas.lastAdRendered = rendered;
                    }
                }

                initStorageLog(function() {
                    getAllStorage(function (a) {
                        if (a.indexedDB && (DBConfig.maxReload > a.indexedDB.length)) {
                            setStorage(function () {
                                setTimeout(function () {
                                    if (DBConfig.maxReload > (a.indexedDB.length + 1)) location.reload();
                                }, 700);
                            });
                        } else {
                            console.log("se ha completado la muestra!");
                        }
                    })
                });

            } catch (e) {
                console.log(e);
                debugger;
            }
        },

        setStorage = function (callback) {
            storageAPI.set({
                conductDisjointly: true,
                recordExpirationData: true,
                data: [{value: metricas}],
                storageTypes: ["indexedDB"],
                options: DBConfig.logOpts,
                complete: callback
            });
        },

        getAllStorage = function (callback) {
            storageAPI.getAll({
                storageTypes: ["indexedDB"],
                options: DBConfig.logOpts,
                complete: callback
            });
        },

        removeAllStorage = function () {
            storageAPI.removeAll({
                storageTypes: ["indexedDB"],
                options: DBConfig.logOpts
            });
        },

        initStorageLog = function (f) {
            DBConfig.logOpts = {
                indexedDB: {
                    databaseName: DBConfig.db,
                    databaseVersion: 1,
                    objectStoreData: {
                        name: DBConfig.table,
                        autoIncrement: true
                    }
                }
            };
            f();
        };

    window.addEventListener('message', function (e) {
        var m = e.data.match ? e.data.match(/^removeAllLogs(.*)/) : null;
        if (m) {
            removeAllStorage();
        }
    });

    window.addEventListener('message', function (e) {
        var m = e.data.match ? e.data.match(/^getAllLogs(.*)/) : null;
        if (m) {
            getAllStorage(function(a) {
                var data = encodeURI(parserReport(a.indexedDB));
                window.open("data:text/csv;charset=utf-8," + data, "DFP Report", "_blank");
            });
        }

        function parserReport (data) {
            if(!data || !data[0] || !data[0].value) {
                return JSON.stringify(data);
            }

            var output = [];
            var head = (Object.keys(data[0].value)).join(",") + "\n";

            data.map(function(x) {
                for(var k in x.value) {
                    var o = x.value[k];
                    output.push(o);
                }
                output.push("#");
            });

            return head+output.join(",").replace(/(#),?/g,"\r\n");
        }
    });

    func(registrarMetricas);

}(function checkDFP(f) {
    if (window["DFPConsole"] && window["DFPConsole"].parser) {
        (typeof f == "function") && f();
    } else {
        setTimeout(function() {
            checkDFP(f);
        }, 1000);
    }
}));