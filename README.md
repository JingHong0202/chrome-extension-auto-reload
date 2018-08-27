## What?
Reloads all unpacked extensions on receive socket event `file.change` from `http://localhost:8890`

## How
Extension tries to connect to socket.io server on `http://localhost:8890` and waits for `file.change` event to flow in.
When an event is incoming, the extension get all extensions in development mode and reload them one by one.

An example on how to send file change events to the extension can be found here:
[robin-drexler/chrome-extension-auto-reload-watcher](https://github.com/robin-drexler/chrome-extension-auto-reload-watcher) or here:
     
    (function(console) {
        'use strict'; 
        var gulp = require('gulp');;
        var watch = require('gulp-watch');
        var io = require('socket.io');
 
        gulp.task('chrome-watch', function () {
            var WEB_SOCKET_PORT = 8890;
 
            io = io.listen(WEB_SOCKET_PORT);
 
            watch('**/*.*', function(file) {
                console.log('change detected', file.relative);
                io.emit('file.change', {});
            });
        });
    })(global.console);
    

## Installation

Just download from the [webstore](https://chrome.google.com/webstore/detail/chrome-unpacked-extension/jfjjbihghhhohnahailbplkciefnaffg)


## Development

```
npm install
npm run build
```


## Author

Originally idea forked from `https://github.com/robin-drexler/chrome-extension-auto-reload` and reworked by me :)

