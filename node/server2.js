const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const python = require("./pythonTf"); 
const app = express();
const imageUploader = require('./imageUploader');


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

// Multer
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname+'/uploads');
      },
    filename: function (req, file, callback){
        callback(null, file.fieldname + '-' + Date.now());
    }
  });


app.use(express.static(__dirname + '../photobooth-client/dist/photobooth-client'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../photobooth-client/dist/photobooth-client/index.html'))
});

app.post('/uploadphoto', function(req, res){
    //console.log('uploadphoto');
    let image = req.body.image;
    //image = image.src
    //console.log(image);

    // Save base64 image to disk
    let fileName = imageUploader.upload(image);
    console.log(fileName);
    python.processImg(fileName,1,function(){
        console.log('done');
    });
});

// HTTP listener
server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Node server listening at", addr.address + ":" + addr.port);
});
module.exports = app;

