// var http  = require('http');
// var fs = require('fs');

// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain'});
//     var readStream = fs.createReadStream(process.argv[3]);
//     readStream.pipe(res);
//     // or fs.createReadStream(process.argv[3]).pipe(res); either one will work. This replaces above two lines.
// });

// server.listen(process.argv[2]);


var $chirpButton = $('#chirp-button');
var $chirpField = $('#chirp-field');
var $chirpList = $('#chirp-list');

$chirpField.on('input', function() {
var isEmpty = $chirpField.val().length === 0;
// if (isEmpty) {
//     $chirpButton.prop('disabled', true);
// } else {
//     $chirpButton.prop('disabled', false);
// }  or...

$chirpButton.prop('disabled', isEmpty)
});
$chirpButton.click(postChirp);

function postChirp() {
    var chirp = {
        message : $chirpField.val(),
        user : 'Judson',
        timestamp : new Date().toISOString()
    };
    $.ajax({
        method: 'POST',
        url: '/api/chirps',
        contentType: 'application/json',
        data: JSON.stringify(chirp)

    }).then(function (success) {
        // successfully POSTed new data to the server
        $chirpField.val('');
        $chirpButton.prop('disabled', true);
        getChirps();
    }, function (err) {
        // an error occurred 
        console.log(err);
    });
}


function getChirps() {
    $.ajax({
        method: 'GET',
        url: '/api/chirps'
    }).then(function (success) {
        $chirpList.empty();
        for (var i = 0; i < chirps.length; i++) {
            var $chirpDiv = $('div class="chirp"></div');
            var $message = $('<p></p>');
            var $user = $('<h4></h4>');
            var$timestamp = $('<h5></h5>');

            $message.text(chirps[i].message);
            $user.text(chirps[i].user);
            $timestamp.text(new Date(chirps[i].timestamp).toLocaleString());


            $message.appendTo($chirpDiv);
            $user.appendTo($chirpDiv);
            $timestamp.appendTo($chirpDiv);

            $chirpDiv.appendTo($chirpList);

        }
    }, function (err) {
        console.log(err);
    });
}
getChirps();