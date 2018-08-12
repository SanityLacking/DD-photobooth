var imageUploader = {};

imageUploader.upload = function(image){
    try{
        // Decoding base-64 image
        // Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
        function decodeBase64Image(dataString) {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          var response = {};

          if (matches.length !== 3){
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

        var imageBuffer = decodeBase64Image(image);
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
                    //console.log('DEBUG - feed:message: Saved to disk image attached by user:', uniquePath);
                });
            return uniqueName + '.' + imageTypeDetected[1];
        } catch(error) {
            console.log('ERROR:', error);
            return false;
        }
    } catch(error) {
        console.log('ERROR:', error);
        return false;
    }
}

module.exports = imageUploader;