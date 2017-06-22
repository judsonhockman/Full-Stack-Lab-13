var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');

var clientPath = path.join(__dirname, '..', 'client');
var dataPath = (__dirname, 'data.json');

var server = http.createServer(function (req, res) {
    var urlData = url.parse(req.url, true);

    if (urlData.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var readStream = fs.createReadStream(path.join(clientPath, 'index.html'));
        readStream.pipe(res);
    } else if (urlData.pathname === '/api/chirps') {
        switch (req.method) {
            case 'GET':
            // GET LOGIC
            res.writeHead(200, { 'Content-Type': 'application/json' });
            fs.createReadStream(dataPath).pipe(res);
            break;
            case 'POST':
            // POST LOGIC
            fs.readFile(dataPath, 'utf8', function(err, fileContents) {
                if (err) {
                    console.log(err);
                    res.writeHead(500, { 'Content-Type' : 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    var chirps = JSON.parse(fileContents);

                    var incomingData = '';
                    req.on('data', function(chunk) {
                        incomingData += chunk;
                    });
                    req.on('end', function() {
                        var newChirp = JSON.parse(incomingData);
                        chirps.push(newChirp);

                        var chirpJSONData = JSON.stringify(chirps);
                        fs.writeFile(dataPath, chirpsJSONData, function(err) {
                            // this tirn it back into a JSON file
                            if (err) {
                                console.log(err);
                                res.writeHead(500, { 'Content-Type' : 'text/plain' });
                                res.end('Internal Server Error');
                                
                            } else {
                                res.writeHead()
                                 res.end()
                            }
                        });
                    });
                }
            });
            break;
        }
    } else if (req.method === 'GET') { // for all other GET requests}
    var fileExtension = path.extname(urlData.pathname);
    var contentType;
    switch (fileExtension) {
        case '.html' :
        contentType = 'text/html';
        break;
        case 'js':
        contentType = 'text/javascript';
        break;
        case '.css':
        contentType = 'text/css';
        break;
        default:
        contentType = 'text/plain';
    }
var readStream = fs.createReadStream(path.join(clientPath, urlData.pathname));
readStream.on('error', function(err) {
    res.writeHead(404);
    res.end();
});
res.writeHead(200, { 'Content-Type' : contentType });
readStream.pipe(res);
}


});
server.listen(3000);
//     } else if (urlData.pathname === '/api/chirps' && req.method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         fs.createReadStream(path.join(__dirname, 'data.json')).pipe(res);

//     } else if (urlData.pathname === '/api/chirps' && req.method === 'POST') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         fs.createReadStream(path.join(__dirname, 'data.json')).pipe(res);
//     } else {
//         var filePath = path.join(clientPath, urlData.pathname);
//         var readStream = fs.createReadStream(filePath);
//         readStream.on('error', function (e) {
//             res.writeHead(404);
//             res.end();
//         });
//         var extension = path.extname(filePath);
//         var contentType;

//         switch (extension) {
//             case '.html':
//                 contentType = 'text/html';
//                 break;
//             case '.css':
//                 contentType = 'text/css';
//                 break;
//             case '.js':
//                 contentType = 'text/javascript';
//                 break;
//             default:
//                 contentType = 'text/plain';
//         }

//         //  res.writeHead(200, { 'Content-Type': contentType});
//         // readStream.pipe(res); 

//     }





// var m = message()
// var u = user()
// var t = timestamp()


// var http  = require('http');
// var fs = require('fs');

// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain'});
//     var readStream = fs.createReadStream(process.argv[3]);
//     readStream.pipe(res);
    // or fs.createReadStream(process.argv[3]).pipe(res); either one will work. This replaces above two lines.
// });

// server.listen(process.argv[2]);
//  * Create a JS object with properties `message`, `user`, and `timestamp`
//             * Send a POST request to `http://localhost:3000/api/chirps`