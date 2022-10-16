var uploadDiv = document.getElementById("upload-video");
var video = document.getElementById("image_toChange");
var file = document.getElementById("img");

var $droparea = $('#upload-video');
var $fileInput = $('#img');

$fileInput.on('dragenter focus click', function () {
    $droparea.addClass('drop-active');
});

// back to normal state
$fileInput.on('dragleave blur drop', function () {
    $droparea.removeClass('drop-active');
});

function dropHandler(e) {
    e.preventDefault();
    [].forEach.call(e.dataTransfer.files, file => {
        // $('#image_toChange').attr("src", "/imgs/design.jpeg")
    });
}
file.onchange = function (e) {
    // $('#image_toChange').attr("src", "/imgs/design.jpeg")
};