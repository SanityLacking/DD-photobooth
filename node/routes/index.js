
/*
 * GET home page.
 */
var pythonTF = require("../pythonTf.js");

exports.index = function(req, res){
  console.log('route working');
  res.render('index', { title: 'Express' });
};

exports.takePhoto = function(req, res){
  res.render('takePhoto', { title: 'Express' });
};

exports.takePosts = function(req, res){
  res.render('takePosts', { title: 'Express' });
};

exports.display = function(req, res){
  res.render('displayPhoto', { title: 'Express' });
};



//ajax api

exports.uploadphoto = function(req, res){
  console.log("uploadPhoto");
  console.log(req.file);
  //res.render('displayPhoto', { title: 'Express' });
  res.json(req.file);
  //res.end();
};

