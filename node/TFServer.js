/**********************************************************************************
 * Thi module is essentially just to send data to our TensorFlow server...
 * I'm not sure what the host IP address or ports are so please update those
 * 
 * 
 * TFServer.post(file_address) -- send the relative address (from node root) of
 *                                where the image you want to send is.
**********************************************************************************/


var TFServer = {};
var host = 'localhost';
var port = 3000;

TFServer.post = function(file_address){
    var http = require('http');
    var fs = require('fs');

    var post_options = {
        'host': host,
        'path': '/api/tf',
        'port': port,
        'timeout': 120000,
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    
    var sender = http.request(post_options, function(res) {
        if (res.statusCode < 399) {
            var text = ""
            res.on('data', function(chunk) {
                text += chunk
            })
            res.on('end', function(data) {
                console.log(text)
            })
        } else {
            console.log("ERROR", res.statusCode)
        }
    })

    try{
        //console.log(__dirname + file_address);
        var POST_DATA = 'data={['
        POST_DATA += fs.readFileSync(__dirname + file_address).toString().replace(/\,+$/,'')
        POST_DATA += ']}'
        console.log(POST_DATA)
        sender.write(POST_DATA)
        sender.end()
    } catch(e){
        console.error('Sending error: ' + e);
    }
}



module.exports = TFServer;