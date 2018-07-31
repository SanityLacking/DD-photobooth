
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/uploads'); // set the destination
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + '.jpg'); // set the file name and extension
    }
});

var upload = multer({ storage:storage })

var app = express();

// const bodyParser = require("body-parser");
// /**bodyParser.json(options)
// * Parses the text as JSON and exposes the resulting object on req.body.
// */
// app.use(bodyParser.json());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/takephoto', routes.takePhoto);
app.get('/takeposts', routes.takePosts);

app.get('/users', user.list);

app.post('/uploadphoto',upload.single('image'), routes.uploadphoto);
//app.post('/upload', routes.upload);
app.get('/display', routes.display);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
