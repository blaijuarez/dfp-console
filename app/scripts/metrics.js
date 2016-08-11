(function(func) {
    "use strict";

    window["DBConfig"] = {
        db: "OSP-Report",
        table: "DFP-Log",
        key: "htmlResponse",
        maxReload: parseInt(window.localStorage.getItem("dfp_num_log_mode")) || 10
    };

    var metricas = {},
        optionsDB = {
            regenerate: true,
            indexedDB: {
                databaseName: DBConfig.db,
                databaseVersion: 1,
                objectStoreData: {
                    name: DBConfig.table,
                    keyPath: null,
                    autoIncrement: true
                },
                objectStoreIndexDataArray: [],
                closeConnection: false
            }
        },
        registrarMetricas = function () {

            var t = performance.timing,
                onlyOne = true;
                metricas.htmlResponse = t.responseEnd - t.navigationStart;
                metricas.domBuilt = t.domInteractive - t.navigationStart;
                metricas.cssomBuilt = t.domContentLoadedEventEnd - t.navigationStart;
                metricas.pageReady = t.domComplete - t.navigationStart;
                metricas.pageEnd = t.loadEventEnd - t.navigationStart;

            try {
                for (var i = 0, l = window["DFPConsole"].slotsSort.length; i < l; i++) {
                    var key = window["DFPConsole"].slotsSort[i];
                    var rendered = window["DFPConsole"].slots[key]["gpt-slot_rendered_load"] ? Math.round(window["DFPConsole"].slots[key]["gpt-slot_rendered_load"]) : Math.round(window["DFPConsole"].slots[key]["gpt-slot_rendered"]);
                    if (key == "m" || key == "si" || key == "sd" || key == "r") {
                        if (onlyOne) {
                            onlyOne = false;
                            metricas.firstKeyAdRendered = rendered;
                        } else {
                            metricas.LastKeyAdRendered = rendered;
                        }
                    }
                    if (i === Object.keys(window["DFPConsole"].slots).length - 1) {
                        metricas.lastAdRendered = rendered;
                    }
                }

                openStorage(function() {
                    getAllStorage(function (a) {
                        if (a.indexedDB && (DBConfig.maxReload > a.indexedDB.length)) {
                            setStorage({value: metricas}, function (success, error) {
                                setTimeout(function () {
                                    if (DBConfig.maxReload > (a.indexedDB.length + 1)) location.reload();
                                }, 700);
                            })
                        }
                    })
                });

            } catch (e) {
                console.log(e);
            }
        },

        openStorage = function (callback) {
            var DBOpenRequest = window.indexedDB.open(DBConfig.db, 1);
            DBOpenRequest.onsuccess = callback;
            DBOpenRequest.onupgradeneeded = function(event) {
                var db = event.target.result;
                db.createObjectStore(DBConfig.table, { keyPath: null, autoIncrement: true });
            };
        },

        getAllStorage = function (callback) {
            storageAPI.getAll({
                storageTypes: ["indexedDB"],
                options: optionsDB,
                complete: callback
            });
        },

        setStorage = function (data, callback) {
            storageAPI.set({
                data: [data],
                storageTypes: ["indexedDB"],
                options: optionsDB,
                complete: callback
            });
        },

        removeAllStorage = function () {
            storageAPI.removeAll({
                storageTypes: ["indexedDB"],
                options: optionsDB
            });
        },

        deleteDB = function (callback) {
            var req = indexedDB.deleteDatabase(DBConfig.db);
            req.onsuccess = callback;
            req.onerror = function () {
                throw new Error("No se puede eliminar la database");
            };
            req.onblocked = function () {
                throw new Error("No se puede eliminar la database por estar bloqueada");
            };
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