const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
 
const app = express();
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


app.use(express.static(__dirname + '../photobooth-client/dist'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../photobooth-client/dist/index.html'))
});

app.post('/uploadphoto', function(req, res){
    console.log('uploadphoto');
    image = req.body.image;
    //console.log(req.body.image)
    res.send(true);
});

// HTTP listener
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Node server listening at", addr.address + ":" + addr.port);
});
module.exports = app;