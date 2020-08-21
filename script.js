var canvas,ctx;
let frame_img = new Image();
let reel_img = new Image();

const STATUS_BEFORE_START = 0;
const STATUS_ROTATING = 1;
const STATUS_DETERMINE = 2;
const STATUS_SHOW_RESULT = 9; 
let status = STATUS_BEFORE_START;

const FRAME_INTERVAL = 25;
const LEFT_REEL_OFFSET_X = 55;
const REEL_WIDTH = 160; //リールの幅のサイズ（縦一個分と同じ）
const REEL_INTERVAL = 30;
const REEL_COLUMN_LENGTH = 4;

const REEL_SPEED = 12.0; //一秒間の回転数（あまり正確ではない）

var reel_positions = [0, 0, 0];
var reel_stop_positions = [REEL_COLUMN_LENGTH, REEL_COLUMN_LENGTH, REEL_COLUMN_LENGTH];


function init(){
  canvas = document.getElementById("animation_canvas");
  ctx = canvas.getContext("2d");
  
  frame_img.src = "./img/frame.png"
  reel_img.src = "./img/reel.png"
  
  canvas.height = 360;
  canvas.width = 650;
  
  interval = setInterval(process, FRAME_INTERVAL);
}

function process(){
  //リールの回転
  rotate_reel();
  
  //リールの描画
  for(let i=0; i<reel_positions.length; i++){
    draw_reel(i, reel_positions[i]);
  }
  
  if(status == STATUS_DETERMINE && check_all_reels_stoped()){
    for(let i=0; i<reel_positions.length; i++){
      reel_positions[i] = reel_stop_positions[i]%REEL_COLUMN_LENGTH;
    }
    status = STATUS_SHOW_RESULT;
  }
  
  //枠の描画
  ctx.drawImage(frame_img, 0, 0, frame_img.width, frame_img.height);
}

function check_all_reels_stoped(){
  for(let i=0; i<reel_positions.length; i++){
    if(reel_positions[i] < reel_stop_positions[i]){
      return false;
    }
  }
  return true;
}

function rotate_reel(){
  for(let i=0; i<reel_positions.length; i++){
    if(status == STATUS_ROTATING){
      if(reel_positions[i] < reel_stop_positions[i]){
        reel_stop_positions[i] -= FRAME_INTERVAL * REEL_SPEED / 1000.0;
      }else{
        reel_positions[i] += FRAME_INTERVAL * REEL_SPEED / 1000.0;
      }
    }else if(status == STATUS_DETERMINE){
      if(reel_positions[i] < reel_stop_positions[i]){
        reel_positions[i] += FRAME_INTERVAL * REEL_SPEED / 1000.0;
      }else{
        reel_positions[i] = reel_stop_positions[i];
      }
    }
    if(status == STATUS_ROTATING){
      reel_positions[i] %= REEL_COLUMN_LENGTH;
    }
  }
}

function draw_reel(row, column){
  column %= REEL_COLUMN_LENGTH;
  
  reel_x = get_reel_x(row);
  reel_y = get_reel_y(column);
  
  if(column <= 1){
    //上がちょん切れるのでもう一個上に継ぎ足し
    upside_reel_y = get_reel_y(column + REEL_COLUMN_LENGTH);
    ctx.drawImage(reel_img, reel_x, upside_reel_y, reel_img.width, reel_img.height);
  }else if(column > REEL_COLUMN_LENGTH-2){
    //下がちょん切れるのでもう一個下に継ぎ足し
    downside_reel_y = get_reel_y(column - REEL_COLUMN_LENGTH);
    ctx.drawImage(reel_img, reel_x, downside_reel_y, reel_img.width, reel_img.height);
  }
  ctx.drawImage(reel_img, reel_x, reel_y, reel_img.width, reel_img.height);
}

function get_reel_x(row){
  //一列目は55、二列目は245、三列目は335始まり
  return LEFT_REEL_OFFSET_X + (REEL_WIDTH + REEL_INTERVAL)*row;
}

function get_reel_y(column){
  frame_center_y = frame_img.height/2;
  reel_center_y = REEL_WIDTH/2;
  return frame_center_y - reel_center_y - REEL_WIDTH*column;
}

function start_rotate(){
  if(status == STATUS_BEFORE_START || status == STATUS_SHOW_RESULT){
    for(let i=0; i<reel_positions.length; i++){
      reel_stop_positions[i] %= REEL_COLUMN_LENGTH;
    }
    status = STATUS_ROTATING;
  }
}

function determine_reel(row1_position, row2_position, row3_position){
  if(status != STATUS_ROTATING){
    return;
  }
  
  for(let i=0; i<reel_positions.length; i++){
    reel_positions[i] %= REEL_COLUMN_LENGTH;
  }
  reel_stop_positions[0] = row1_position + REEL_COLUMN_LENGTH*3;
  reel_stop_positions[1] = row2_position + REEL_COLUMN_LENGTH*6;
  reel_stop_positions[2] = row3_position + REEL_COLUMN_LENGTH*9;
  
  status = STATUS_DETERMINE;
}


