
var s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/app.js');
s.onload = function() {
    //this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);



//document.write('\x3Cscript type="text/javascript" src="'+s.src+'">\x3C/script>');


/*
var gptWatch = setInterval(function() {
    var maxAttempts = 1000,
        count=0;
    return function() {
        if ("googletag" in window) {
            window.console.info("DFP load!!!!!!.");
            clearInterval(gptWatch);
        }else{
            if (count>maxAttempts) {
                window.console.warn("Hubo un error recuperando la publicidad...");
                window.console.dir(window);
                clearInterval(gptWatch);
            }else{
                window.console.log("DFP loading...");
            }
        }
        count++;
    }
}(),10);

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    console.log(event);
    console.log(event.data.text);

}, false);*/