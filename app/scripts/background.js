(function() {
    "use strict";

    var millisecondsPerCentury = 1000 * 60 * 60 * 24 * 7 * 30 * 12 * 100;
    var oneCenturyAgo = (new Date()).getTime() - millisecondsPerCentury;

    chrome.runtime.onMessage.addListener(
        function(request) {
            if (request.action == "removeUserBrowserData") {
                chrome.browsingData.remove({
                    "since": oneCenturyAgo,
                    "originTypes": {
                        "unprotectedWeb": true
                    }
                }, {
                    "cache": true,
                    "cookies": true
                }, null);
            }
        });

    chrome.webRequest.onBeforeRequest.addListener(
        function (response) {
            if (/^.+(gpt\/pubads_impl.+)\.js$/.test(response.url)) {
                var redirect = {};
                redirect.redirectUrl =  chrome.extension.getURL('scripts/pubads_impl_90.js');
                return redirect;
            }
        },
        {urls: ["*://*.googleadservices.com/*"], types: ["script"]},
        ["blocking"]);
}());