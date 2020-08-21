var canvas,ctx;
var frame_img = new Image();

var status = 0;

function init(){
  canvas = document.getElementById("animation_canvas");
  ctx = canvas.getContext("2d");
  
  frame_img.src = "./img/frame.png"
  
  console.log("init");
  
  canvas.height = 480;
  canvas.width = 650;
  
  interval = setInterval(process, 25);
}

function process(){
  ctx.drawImage(frame_img, 0, 0, frame_img.width, frame_img.height);
}



function push_button(){
  
}


