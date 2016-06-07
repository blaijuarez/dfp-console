(function() {
    "use_strict";

    chrome.webRequest.onBeforeRequest.addListener(
        function (info) {
            return {redirectUrl: chrome.extension.getURL('scripts/pubads_impl_88.js')};
        },
        {urls: ["*://partner.googleadservices.com/gpt/pubads_impl_*"], types: ["script"]},
        ["blocking"]);
}());