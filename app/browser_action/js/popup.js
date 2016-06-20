(function() {
    "use_strict";

    function Prefs() {
        var formData = null;
        return {
            getData: getData,
            setData: setData
        };
        function getData() {
            return formData;
        }
        function setData(value) {
            formData = value;
        }
    }

    const modes = ["disableInitialLoad", "singleRequest", "asyncRendering"];
    var initialData = new Prefs(),
        p = null,
        DFPObject = null,
        requestQuery = function (data, callback) {

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    data, callback);
            });
        },
        resetValues = function (data) {
            requestQuery({from: 'popup', subject: 'resetLocalStorage', modes: data}, null);
        },
        showAlerts = function (data) {
            DFPObject = data;
        },
        init = function () {
            requestQuery({from: 'popup', subject: 'getDFPConsoleObject', modes: modes}, showAlerts);
            p = new Promise(
                function (resolve) {
                    requestQuery({from: 'popup', subject: 'getLocalStorage', modes: modes}, allReady);
                    function allReady(s) {
                        initialData.setData(s);
                        resolve(initialData);
                    }
                }
            );
        };

    window.onload = function () {
        var alerts = document.getElementsByClassName("alert");
        var overlay = document.getElementById("overlay");

        init();

        p.then(function(response) {

            if(!DFPObject) return;

            //if(DFPObject && !DFPObject.ready) return;

            console.log(DFPObject);

            alerts[0].style.display = "block";
            alerts[1].style.display = "none";
            overlay.style.display = "none";

            var formData = response.getData();
            var bReset = document.getElementById("btn_reset");
            bReset.onclick = function () {
                $('input').bootstrapToggle('off');
                resetValues(modes);
            };
            /*var bReload = document.getElementById("btn_reload");
            bReload.onclick = function () {
                requestQuery({from: 'popup', subject: 'reload'}, null);
            };*/
            var bRefresh = document.getElementById("btn_refresh");
            bRefresh.onclick = function (e) {
                requestQuery({from: 'popup', subject: 'refreshAds'}, null);
            };
            var bShow = document.getElementById("btn_show");
            bShow.onclick = function (e) {
                requestQuery({from: 'popup', subject: 'showConsole'}, null);
            };
            var r = document.getElementsByTagName("input");
            for (var i = 0, l = r.length; i < l; i++) {
                if (formData !== null) {
                    var state = null;
                    for (var key in formData) {
                        if(r[i].name === key) {
                            state = (formData[key] == 'true') ? 'on' : 'off';
                        }
                    }
                }
                $("[name='"+r[i].name+"']").bootstrapToggle(state).change(function() {
                    var sender = {"name": this.name, "value": $(this).prop('checked')};
                    requestQuery({from: 'popup', subject: 'setLocalStorage', data: sender}, null);
                });
            }
        });
    };
})();