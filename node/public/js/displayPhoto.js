(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

/* Legacy code below: getUserMedia 
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }, errBack);
}
*/

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 640, 480);
	var image = convertCanvasToImage(canvas);
	photoUpload(image);
});

// Converts canvas to an image
function convertCanvasToImage(canvas) {
    var d = new Date()
	var image = new Image();
	image.src = canvas.toDataURL(d.getTime()+"/png");
	return image;
}

function photoUpload(image){
     $.ajax({
        type: "POST",
        url: "https://deepdreamphotobooth-sanityl.c9users.io/uploadphoto",
        success: function (data) {
            // your callback here
            console.log("success!");
        },
        error: function (error) {
            // handle error
            console.log("error"+error);
            console.log(error);
        },
        async: true,
        data: image,
        cache: false,
        contentType: false,
        processData: false,
        timeout: 60000
    });
    console.log("photoUpload")
    
}