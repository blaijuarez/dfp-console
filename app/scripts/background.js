(function() {
    "use_strict";

    chrome.webRequest.onBeforeRequest.addListener(
        function (response) {

            var redirect = {};

            /*if (/^.+(tag\/js\/gpt)\.js$/.test(response.url) && !oneTime) {
                //redirect.redirectUrl =  chrome.extension.getURL('scripts/gpt.js');
                //redirect.cancel =  true;
            }*/

            if (/^.+(gpt\/pubads_impl.+)\.js$/.test(response.url)) {
                redirect.redirectUrl =  chrome.extension.getURL('scripts/pubads_impl_90.js');
            }
            return redirect;
        },
        {urls: ["*://*.googleadservices.com/*","*://*.googletagservices.com/*","*://*/*"], types: ["script"]},
        ["blocking"]);
}());