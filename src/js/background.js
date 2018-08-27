(function (console) {
    "use strict";

    console.log('background.js reloader')

    const CHROME_EXTENSION_URL = 'chrome://extensions/';
    const SOCKET_IO_PORT = '8890';

    var io = require('socket.io-client');
    var socket = io('http://localhost:' + SOCKET_IO_PORT);


    function reloadTab(tab) {
        console.log('reloading tab', tab);

        chrome.management.getAll(function(extensions){
            for(var i in extensions){
                let extension = extensions[i];

                console.log(extension, 'ext')

                if (extension.installType === "development" && extension.enabled && extension.name !== "Extension Auto Reload") {
                    chrome.management.setEnabled(extension.id, false, function(){
                        chrome.management.setEnabled(extension.id, true);
                    });
                }
            }
        });



        // chrome.tabs.reload(tab.id);
    }

    function reloadExtensions() {
        // search for any open extension tab and reload
        chrome.tabs.query({
            url: CHROME_EXTENSION_URL
        }, function (tabs) {
            console.log('found tabs', tabs.length, tabs);

            if (tabs.length) {
                reloadTab(tabs[0]);
            } else {
                // no extension tab found. Create and reload
                console.log('creating new tab');
                chrome.tabs.create({
                        url: CHROME_EXTENSION_URL,
                        index: 0,
                        pinned: true,
                        active: false
                    }, function (tab) {
                        window.setTimeout(function () {
                            reloadTab(tab);
                        }, 500); //not sure why immediate reload does not seem to work...
                        // note to self, probably one has to wait for load event, so it can be actually *re*loaded
                    }
                );
            }

        });
    }

    socket.on('file.change', function () {
        console.log('received ping');
        reloadExtensions();
    });

})(window.console);


