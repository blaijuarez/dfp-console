(function() {
    "use_strict";

    chrome.webRequest.onBeforeRequest.addListener(
        function (response) {

            var redirect = {};

            if (/^.+(gpt\/pubads_impl.+)\.js$/.test(response.url)) {
                redirect.redirectUrl =  chrome.extension.getURL('scripts/pubads_impl_90.js');
            }
            return redirect;
        },
        {urls: ["*://*.googleadservices.com/*"], types: ["script"]},
        ["blocking"]);
}());