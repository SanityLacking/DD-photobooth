const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const imageUploader = require('./imageUploader');

// Tensorflow options
var local_filter = true;                           // Do we want TF to be done locally or on another server?
const python = require("./pythonTf"); 
const TFServer = require('./TFServer');

app.use(express.static(__dirname));
 
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
})); // support json encoded bodies


// CORS
const cors = require('cors')
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions))

// App Data
var photos = [];

// Routes
app.use(express.static(path.join(__dirname, '../photobooth-client/dist/photobooth-client')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../photobooth-client/dist/photobooth-client/index.html'))
});

app.post('/api/uploadphoto', function(req, res){
    //console.log('uploadphoto');
    let image = req.body.image;
    let filter = req.body.filter;
    let photo_obj = {
        original: null,
        filter: null
    };
    //image = image.src
    //console.log(image);

    console.log('using filter #: ' + filter);

    // Save base64 image to disk
    let fileName = imageUploader.upload(image);
    console.log(fileName);

    /*
        If we set local_filter to true, we'll try and run our Python module. Otherwise we need to 
        make sure that our data is sent to the cloud server.
        Note: Python module needs TensorFlow and Python3 to be installed
    */
    if(local_filter){
        python.processImg(fileName,filter,function(cb){
            console.log('callback: ' + cb);
            res.send({path: cb});
        });
    } else {
        TFServer.post('/public/uploads/' + fileName);
    }


});
app.post('/api/tf', function(req, res){
    console.log("TF request");
});

// HTTP listener
server = app.listen(process.env.PORT || 80, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Node server listening at", addr.address + ":" + addr.port);
});
module.exports = app;

