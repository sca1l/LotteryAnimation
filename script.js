var canvas,ctx;
var frame_img = new Image();
var reel_img = new Image();

var status = 0;
var time = 0;

const LEFT_REEL_OFFSET_X = 55;
const REEL_SIZE = 160; //���[���̕��̃T�C�Y�i�c����Ɠ���		�j
const REEL_INTERVAL = 30;

const REEL_COLUMN_LENGTH = 4;


function init(){
  canvas = document.getElementById("animation_canvas");
  ctx = canvas.getContext("2d");
  
  frame_img.src = "./img/frame.png"
  reel_img.src = "./img/reel.png"
  
  console.log("init");
  
  canvas.height = 360;
  canvas.width = 650;
  
  interval = setInterval(process, 25);
}

function process(){
  //����
  draw_reel(0, time*0.3);
  //����
  draw_reel(1, time*0.3 + 1);
  //�O���
  draw_reel(2, time*0.3 + 2);
  
  time++;
  
  ctx.drawImage(frame_img, 0, 0, frame_img.width, frame_img.height);
}

function draw_reel(row, column){
  column %= REEL_COLUMN_LENGTH;
  
  reel_x = get_reel_x(row);
  reel_y = get_reel_y(column);
  
  if(column < 1){
    //�オ�����؂��̂ł������Ɍp������
    upside_reel_y = get_reel_y(column - REEL_COLUMN_LENGTH);
    ctx.drawImage(reel_img, reel_x, upside_reel_y, reel_img.width, reel_img.height);
  }else if(column > REEL_COLUMN_LENGTH-2){
    //���������؂��̂ł�������Ɍp������
    downside_reel_y = get_reel_y(column - REEL_COLUMN_LENGTH);
    ctx.drawImage(reel_img, reel_x, downside_reel_y, reel_img.width, reel_img.height);
  }
  ctx.drawImage(reel_img, reel_x, reel_y, reel_img.width, reel_img.height);
}

function get_reel_x(row){
  //���ڂ�55�A���ڂ�245�A�O��ڂ�335�n�܂�
  return LEFT_REEL_OFFSET_X + (REEL_SIZE + REEL_INTERVAL)*row;
}

function get_reel_y(column){
  column = column % REEL_COLUMN_LENGTH;
  frame_center_y = frame_img.height/2;
  reel_center_y = REEL_SIZE/2;
  return frame_center_y - reel_center_y - REEL_SIZE*column;
}



function push_button(){
  
}


