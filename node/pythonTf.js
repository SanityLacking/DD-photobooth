var PythonShell = require('python-shell');
//var pythonTF;
var pythonTf = {};

pythonTf.processImg = function(inputA,checkpointS,callback){
	var inputArg = inputA;
	var imgType =".jpg";
	// Not sure if we need to make a new name -- the original files will all be unique
	//var outputArg = inputArg.substring(0,inputArg.lastIndexOf("."))+"_"+Math.floor(new Date() / 1000)+imgtype;
	var outputArg = inputA.substring(0, inputArg.lastIndexOf('.'))+"_filter" + imgType;
	var checkpointStr = checkpointS;
	var checkpoint="";

	switch(checkpointStr){
		case "wave":
		checkpoint = "wave.ckpt";
		case "la muse":
		checkpoint = "la_muse.ckpt";
		case "rain princess":
		checkpoint = "rain_princess.ckpt";
		case "scream":
		checkpoint = "scream.ckpt";
		case "udnie":
		checkpoint = "udnie.ckpt";
		case "wreck":
		checkpoint = "wreck.ckpt";
		default:
		checkpoint = "wave.ckpt"; //for now this will be the default.
	}
	var scriptPath = './python_code/';
	var checkpointPath ="checkpoints/";
	var inputPath ="../public/uploads/";
	var outputPath ="../public/images/";

	var options = {
		mode: 'text',
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: scriptPath,
		args: ['--checkpoint', scriptPath+checkpointPath+checkpoint,
				'--in-path',scriptPath+inputPath+inputArg,
				'--out-path',scriptPath+outputPath+outputArg
				]
	};
	PythonShell.run('evaluate.py', options, function (err, results) {
	if (err) throw err;
		console.log('results: %j', results);
		callback(outputArg);
	});
}	
module.exports = pythonTf;

/*

var express = require('express');
var router = express.Router();
var pythonTF = require("../test.js");


router.get('/', function(req, res, next) {
  pythonTF.processImg("chicago.jpg","wave",function(result){
  	console.log("image processed: "+result);
  });
  res.render('index', { title: 'Express' });

});

router.get('/test', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

module.exports = router;
*/