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
        init = function () {
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

        init();

        p.then(function(response) {
            var formData = response.getData();
            var r = document.getElementsByTagName("input");
            for (var i = 0, l = r.length; i < l; i++) {
                if (formData !== null) {
                    for (var key in formData) {
                        if (r[i].name === key && r[i].value == formData[key]) {
                            r[i].setAttribute("checked", true);
                        }
                    }
                }
                r[i].onclick = function (e) {
                    var sender = {"name": this.name, "value": this.value};
                    requestQuery({from: 'popup', subject: 'setLocalStorage', data: sender}, null);
                }
            }

            var bReset = document.getElementById("btn_reset");
            bReset.onclick = function () {
                resetValues(modes);
            };

            var bReload = document.getElementById("btn_reload");
            bReload.onclick = function () {
                requestQuery({from: 'popup', subject: 'reload'}, null);
            };

            var bRefresh = document.getElementById("btn_refresh");
            bRefresh.onclick = function (e) {
                requestQuery({from: 'popup', subject: 'refreshAds'}, null);
            };

            var bShow = document.getElementById("btn_show");
            bShow.onclick = function (e) {
                requestQuery({from: 'popup', subject: 'showConsole'}, null);
            };
            
        });
    };
})();