//serve-audio.js
const http = require('http');
const fs = require('fs');
const server = http.createServer (function (req, res) {
console.log("Port Number: 4000");
// change MIME type to 'audio/mp3
    res.writeHead (200, {'Content-Type': 'audio/mp3'});
    fs.exists(req.url.slice(1,), function(exists) {
        if (exists) {
            let rstream = fs.createReadStream(req.url.slice(1,));
            rstream.pipe(res);
        } else {
            res.end("Its a 404");
        }
    });
}).listen(4000);
// server.on('request', function(req, res) {
//
//     console.log(req.url.slice(1,)); res.writeHead (200, {'Content-Type': 'audio/mp3'});
//     fs.exists(req.url.slice(1,), function(exists) {
//         if (exists) {
//             let rstream = fs.createReadStream(req.url.slice(1,));
//             rstream.pipe(res);
//         } else {
//             res.end("Its a 404");
//         }
//     });
// });