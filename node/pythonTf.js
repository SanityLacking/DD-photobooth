var PythonShell = require('python-shell');


function processImg(inputA,checkpointS,callback){
		var inputArg = inputA;
		var imgtype =".jpg";
		var outputArg = inputArg.substring(0,inputArg.lastIndexOf("."))+"_"+Math.floor(new Date() / 1000)+imgtype;
		var checkpointStr =checkpointS;
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
		var scriptPath = './python/';
		var checkpointPath ="examples/checkpoint/";
		var inputPath ="";
		var outputPath ="";
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
module.exports.processImg = processImg;