const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
 
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
    console.log('uploadphoto');
    let image = req.body.image;

    // Save base64 image to disk
    try
    {
        // Decoding base-64 image
        // Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
        function decodeBase64Image(dataString) {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          var response = {};

          if (matches.length !== 3) 
          {
            return new Error('Invalid input string');
          }

          response.type = matches[1];
          response.data = new Buffer(matches[2], 'base64');

          return response;
        }

        // Regular expression for image type:
        // This regular image extracts the "jpeg" from "image/jpeg"
        var imageRegEx = /\/(.*?)$/;      

        // Generate random string
        var crypto = require('crypto');
        var seed = crypto.randomBytes(20);
        var uniqueString = crypto.createHash('sha1').update(seed).digest('hex');

        var base64Data = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAZABkAAD/4Q3zaHR0cDovL25zLmFkb2JlLmN...';

        var imageBuffer = decodeBase64Image(base64Data);
        var uploadLocation = 'public/uploads/';

        var uniqueName = 'image-' + uniqueString;
        // This variable is actually an array which has 5 values,
        // The [1] value is the real image extension
        var imageTypeDetected = imageBuffer.type.match(imageRegEx);

        var uniquePath = uploadLocation + uniqueName + '.' + imageTypeDetected[1];

        // Save decoded binary image to disk
        try {
        require('fs').writeFile(
            uniquePath, 
            imageBuffer.data,  
            function(){
                console.log('DEBUG - feed:message: Saved to disk image attached by user:', uniquePath);
            });
        } catch(error) {
            console.log('ERROR:', error);
        }

    } catch(error) {
        console.log('ERROR:', error);
    }
    
});

// HTTP listener
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
module.exports = app;

