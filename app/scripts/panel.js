(function() {
    "use_strict";

    var dfp_btn = document.getElementById("dfp_btn");
    var dfp_print = document.getElementById("dfp_print");

    dfp_btn.onclick = function() {
        dfp_print.innerHTML = 'Another stupid example!';
    };

    function do_something(msg) {
        dfp_print.innerHTML = msg;
    }


    var DFPOutput = function (output) {
        /*console.dir(output);

         //window.console.clear();

         var t = window.performance.timing,
         interactive = t.domInteractive - t.navigationStart,
         load = t.loadEventEnd - t.navigationStart,
         dcl = t.domContentLoadedEventEnd - t.navigationStart;
         load = load<0 ? window.performance.now() : load;


         window.console.log("\n%cDFP Console\n%c by OSP Team - v0.1.0\n\n",
         "font-family: Georgia, serif; font-size: 32px; color: #005689",
         "font-family: Helvetica Neue, sans-serif; font-size: 11px; text-decoration: underline; line-height: 1.2rem; color: #767676");

         for (var key in output.slots) {

         if(!(/^(m|r)$/.test(key)) && output.observer[key]) {
         //output.observer[key].disconnect();
         }

         var offset = output.slots[key].offset;
         var totalFetch = Math.round(output.slots[key].fetch);
         var totalRendering = Math.round(output.slots[key].rendering);
         var totalRendered = Math.round(output.slots[key].rendering);

         window.console.groupCollapsed("%cSlot: [" + key + "] [" + output.slots[key].data + "]",
         "border: 1px solid rgba(0,0,0,0.1);color:#3b7bea;background-color: #f5f5f5;height: 30px; padding: 1px 8px;cursor:pointer;");
         window.console.log("%c[" + totalFetch + " ms] %cRecibiendo anuncio.",
         "font-weight:bold;color:#333; padding: 0 1px",
         "color: #555;");
         window.console.log("%c[" + totalRendering + " ms] %cRenderizando anuncio.",
         "font-weight:bold;color:#333; padding: 0 1px",
         "color: #555");
         window.console.log("%c[" + totalRendered + " ms] %cRenderizado de anuncio completado.",
         "font-weight:bold;color:#333; padding: 0 1px",
         "color: #555");
         window.console.log("%c" + (output.slots[key].google_receiving - output.slots[key].google_fetch) + " ms to load%c | %c" + (output.slots[key].google_rendered - output.slots[key].google_rendering) + " ms to render%c | %c" + (output.slots[key].google_rendered - output.slots[key].google_fetch) + " ms total",
         "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px",
         "border:none; background: #fff; font-weight:bold;color:#ddd",
         "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px",
         "border:none; background: #fff; font-weight:bold;color:#ddd",
         "border:1px solid #E3FFDD; background: #E3FFDD;color:#18A218; padding: 0 4px");
         window.console.groupEnd();
         }
         window.console.log('\n%cinteractive: ' + (interactive / 1000).toFixed(2) + ' s' +
         '%c | ' +
         '%cload: ' + (load / 1000).toFixed(2) + ' s' +
         '%c | ' +
         '%cDOMContentLoaded: ' + (dcl / 1000).toFixed(2) + ' s',

         "border: 1px solid rgb(255, 204, 52);background-color: rgb(247, 248, 224);padding:1px 8px;",
         "border:none; background: #fff; font-weight:bold;color:#ddd",
         "border: 1px solid rgb(255, 204, 52);background-color: rgb(247, 248, 224);padding:1px 8px;",
         "border:none; background: #fff; font-weight:bold;color:#ddd",
         "border: 1px solid rgb(255, 204, 52);background-color: rgb(247, 248, 224);padding:1px 8px;");
         */
    };

})();