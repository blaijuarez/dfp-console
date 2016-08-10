(function() {
    "use strict";

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

    const modes = ["dfp_disable_initial_load", "dfp_single_request", "dfp_async_rendering", "dfp_extension_disabled", "dfp_log_mode", "dfp_num_log_mode"];
    var initialData = new Prefs(),
        q = null,
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

            var bReset = document.getElementById("btn_reset"),
                sender = {"name": $(bReset).attr("name"), "value":value.toString()};

            setButtonToggle(bReset, "value", value, "alert-danger");
            requestQuery({from: 'popup', subject: 'setLocalStorage', modes: modes, data: sender}, initialData.setData);

            $(".list-group").toggleClass("disable", value);
            $('input').bootstrapToggle(value ? "disable" : "enable");
        },
        setButtonToggle = function (obj,key,value,style) {
            $(obj).prop(key,value);
            $(obj).toggleClass(style,value);
        },
        setDFPConsoleObject = function (data) {
            DFPObject = data.DFPConsoleObject;
            DFPorigin = data.origin;
        },
        booleanCast = function(data) {
            return data == "false" ? false : true;
        },
        reloadPage = function () {
            requestQuery({from: 'popup', subject: 'reloadPage'}, null);
        },
        init = function () {
            requestQuery({from: 'popup', subject: 'getDFPConsoleObject'}, setDFPConsoleObject);
            q = new Promise(
                function (resolve) {
                    requestQuery({from: 'popup', subject: 'getLocalStorage', modes: modes}, allReady);
                    function allReady(s) {
                        initialData.setData(s);
                        resolve(initialData);
                    }
                }
            );
        };

    document.addEventListener("DOMContentLoaded", function() {

        var formData = null,
            extensionDisabled = null,
            extensionLogMode = null,
            r = document.querySelectorAll(".dfp_config input"),
            alerts = document.getElementsByClassName("alert"),
            overlay = document.getElementById("overlay");

        init();

        var bReset = document.getElementById("btn_reset");
        bReset.onclick = function () {
            var value = $(this).prop("value") ? false : true;
            enableDisable(value);
        };

        var bRefresh = document.getElementById("btn_refresh");
        bRefresh.onclick = function (e) {
            requestQuery({from: 'popup', subject: 'refreshAds'}, null);
        };

        var bShow = document.getElementById("btn_show");
        bShow.onclick = function (e) {
            requestQuery({from: 'popup', subject: 'showConsole'}, null);
        };

        var bTimeline = document.getElementById("btn_timeline");
        bTimeline.onclick = function (e) {
            var q = new Promise(
                function (resolve) {
                    requestQuery({from: 'popup', subject: 'showConsole', modes: null}, createTimeline);
                    function createTimeline() {
                        requestQuery({from: 'popup', subject: 'getDFPConsoleObject', modes: modes}, setDFPConsoleObject);
                        resolve();
                    }
                }
            );
            q.then(function() {
                chrome.tabs.create({ url: "../timeline/index.html?p="+DFPorigin+"&DFPObject="+encodeURI(JSON.stringify(DFPObject))});
            });
        };

        var bLogMode = document.getElementById("dfp_log_mode");
        bLogMode.onclick = function () {
            var value = $(this).prop("value") ? false : true;
            $("section.logMode").slideToggle();
            setButtonToggle(this, "value", value, "alert-warning");
        };

        var bSubmitLogMode = document.getElementById("btn_logMode");
        bSubmitLogMode.onclick = function (e) {
            requestQuery({from: 'popup', subject: 'removeAllLogs'}, preSetMode);
            function preSetMode() {
                var sender = {"name": "dfp_log_mode", "value":"true"};
                requestQuery({from: 'popup', subject: 'setLocalStorage', modes: null, data: sender}, preReload);
            }
            function preReload() {
                var value = document.getElementById("numLogMode").value,
                    sender = {"name": "dfp_num_log_mode", "value": value.toString()};
                requestQuery({from: 'popup', subject: 'setLocalStorage', modes: null, data: sender}, reloadPage);
            }
        };

        var bDeleteData = document.getElementById("btn_delete_data");
        bDeleteData.onclick = function (e) {
            var confirmMsg = document.getElementById("confirmMsg");
            $(confirmMsg).show();
        };

        var bConfirmDeleteData = document.getElementById("btn_confirm_delete");
        bConfirmDeleteData.onclick = function (e) {
            var confirmMsg = document.getElementById("confirmMsg");
            requestQuery({from: 'popup', subject: 'setLocalStorage', modes: null, data: {"name": "dfp_log_mode", "value":"false"}}, preRemoveAll);
            function preRemoveAll() {
                requestQuery({from: 'popup', subject: 'removeAllLogs'}, function(){$(confirmMsg).hide()});
            }
        };

        var bCancelDeleteData = document.getElementById("btn_cancel_delete");
        bCancelDeleteData.onclick = function (e) {
            var confirmMsg = document.getElementById("confirmMsg");
            $(confirmMsg).hide();
        };

        var bShowData = document.getElementById("btn_show_data");
        bShowData.onclick = function (e) {
            requestQuery({from: 'popup', subject: 'showReportDB'});
        };

        q.then(function(response) {

            if(!DFPObject) return;

            formData = response.getData();

            alerts[0].style.display = "block";
            alerts[1].style.display = "none";
            overlay.style.display = "none";

            extensionDisabled = formData["dfp_extension_disabled"] ? booleanCast(formData["dfp_extension_disabled"]) : true;
            $(bReset).prop("value", extensionDisabled);
            enableDisable(extensionDisabled);

            extensionLogMode = formData["dfp_log_mode"] ? booleanCast(formData["dfp_log_mode"]) : false;
            $(bLogMode).prop("value", extensionLogMode);
            setButtonToggle(bLogMode, "value", extensionLogMode, "alert-warning");
            if(extensionLogMode) {
                $("section.logMode").show();
            }

            for (var i = 0, l = r.length; i < l; i++) {

                var state = (formData[r[i].name] && formData[r[i].name] == 'true') ? 'on' : 'off';

                if(!formData[r[i].name] && !(/^.+disableInitialLoad$/).test(r[i].name)) {
                    var sender = {"name": r[i].name, "value": "false"};
                    requestQuery({from: 'popup', subject: "setLocalStorage", data: sender}, null);
                }

                $("[name='"+r[i].name+"']").bootstrapToggle(state).change(function() {
                    var sender = {"name": this.name, "value": $(this).prop('checked')},
                        subject = ((/^.+disableInitialLoad$/).test(this.name) && !$(this).prop('checked')) ? "removeLocalStorage" : "setLocalStorage";
                    requestQuery({from: 'popup', subject: subject, modes: modes, data: sender}, initialData.setData);
                });
            }
        });
    });
})();