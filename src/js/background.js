(function (console) {
    "use strict";

    console.log('Hello, Dev Extension Auto Reload')

    const SOCKET_IO_PORT = '8890';

    var io = require('socket.io-client');
    var socket = io('http://localhost:' + SOCKET_IO_PORT);

    function reloadExtensions() {
        console.log('reloading extensions');

        chrome.management.getAll(function(extensions){
            for(let extension of extensions){
                if (extension.installType === "development" && extension.id !== chrome.runtime.id) {
                    chrome.management.setEnabled(extension.id, false, function(){
                        chrome.management.setEnabled(extension.id, true);
                        console.log('Reloaded', extension)
                    });
                }
            }
        });
    }

    socket.on('file.change', function () {
        console.log('received ping');
        reloadExtensions();
    });
})(window.console);


