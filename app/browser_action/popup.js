window.onload = function() {
    document.getElementById("buttonDFP").onclick = function() {
        chrome.extension.sendMessage({
            type: "print"
        });
    }
}