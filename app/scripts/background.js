(function() {
    "use_strict";

    chrome.webRequest.onBeforeRequest.addListener(
        function (info) {
            return {redirectUrl: chrome.extension.getURL('scripts/pubads_impl_88.js')};
        },
        {urls: ["http://partner.googleadservices.com/gpt/pubads_impl_88.js"], types: ["script"]},
        ["blocking"]);
}());