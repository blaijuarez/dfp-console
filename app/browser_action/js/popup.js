(function() {
    "use_strict";

    function Prefs() {
        var formData = null;
        return {
            getData: getData,
            setData: setData
        };
        function getData() {
            //console.log("get",formData);
            return formData;
        }
        function setData(value) {
            //console.log("set",value);
            formData = value;
        }
    }

    const modes = ["dfp_disableInitialLoad", "dfp_singleRequest", "dfp_asyncRendering", "dfp_extensionEnabled"];
    var initialData = new Prefs(),
        p = null,
        DFPObject = null,
        DFPorigin = null,
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
        enableDisable = function (value) {
            setButtonReset("value", value);
            if(value!=="true") {
                $('.list-group').addClass("disable");
                $("#btn_reset").addClass("alert-danger").removeClass("alert-default");
                $('input').bootstrapToggle('disable');
            }else{
                $('.list-group').removeClass("disable");
                $("#btn_reset").addClass("alert-default").removeClass("alert-danger");
                $('input').bootstrapToggle('enable');
            }
        },
        setButtonReset = function (k,v) {
            var bReset = document.getElementById("btn_reset");
            $(bReset).prop(k,v);
        },
        showAlerts = function (data) {
            DFPObject = data.DFPConsoleObject;
            DFPorigin = data.origin;
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

        init();

        p.then(function(response) {

            if(!DFPObject) return;

            var formData = response.getData(),
                bReset = document.getElementById("btn_reset"),
                extensionEnabled = formData["dfp_extensionEnabled"] || true,
                r = document.getElementsByTagName("input"),
                alerts = document.getElementsByClassName("alert"),
                overlay = document.getElementById("overlay");

            alerts[0].style.display = "block";
            alerts[1].style.display = "none";
            overlay.style.display = "none";

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
                    var sender = {"name": this.name, "value": $(this).prop('checked')},
                        subject = ((/^.+disableInitialLoad$/).test(this.name) && !$(this).prop('checked')) ? "removeLocalStorage" : "setLocalStorage";
                    requestQuery({from: 'popup', subject: subject, modes: modes, data: sender}, initialData.setData);
                });
            }

            $(bReset).prop("value",extensionEnabled);
            enableDisable(extensionEnabled);

            bReset.onclick = function () {
                var value = $(this).prop("value") !=="true" ? "true" : "false",
                    sender = {"name": $(this).attr("name"), "value":value};
                enableDisable(value);
                requestQuery({from: 'popup', subject: 'setLocalStorage', modes: modes, data: sender}, initialData.setData);

                formData = initialData.getData();

                if(value=="true" && (!formData.dfp_singleRequest || !formData.dfp_asyncRendering)) {
                    setAll();
                }
            };

            var bRefresh = document.getElementById("btn_refresh");
            bRefresh.onclick = function (e) {
                requestQuery({from: 'popup', subject: 'refreshAds'}, null);
            };

            var bShow = document.getElementById("btn_show");
            bShow.onclick = function (e) {
                requestQuery({from: 'popup', subject: 'showConsole'}, null);
            };

            var bTimeline = document.getElementById("timeline");
            bTimeline.onclick = function (e) {
                chrome.tabs.create({ url: "../timeline/index.html?p="+DFPorigin+"&DFPObject="+encodeURI(JSON.stringify(DFPObject)) });
            };
        });

        function setAll() {
            var r = document.getElementsByTagName("input");
            for (var i = 0, l = r.length; i < l; i++) {

                if(r[i].name=="dfp_disableInitialLoad") {
                    continue;
                }

                var obj = $("[name='"+r[i].name+"']");
                console.log(obj[0].name, obj.prop('checked'));
                var sender = {"name": obj[0].name, "value": obj.prop('checked')};
                requestQuery({from: 'popup', subject: "setLocalStorage", modes: modes, data: sender}, initialData.setData);
            }
        }
    };
})();