(function() {
    "use_strict";

    window.onload = function () {

        function Prefs() {

            var formData = null;

            function getData() {
                return formData;
            }

            function setData(value) {
                formData = value;
            }

            return {
                getData: getData,
                setData: setData
            };
        }

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

            resetValues = function () {
                requestQuery({from: 'popup', subject: 'resetLocalStorage'}, initialData.setData);
            },

            init = function () {
                var modes = ["disableInitialLoad", "singleRequest", "asyncRendering"];

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
        });
    };
})();