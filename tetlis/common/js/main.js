
  'use strict';

let array = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]
];

  let memory = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]
];

  let move = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0]
];

let moveFlag = 0;//ブロックが落下中かの判定（1なら落下中、0なら落下なし）
let keyInputNum;//キー入力
let gameStep = 1;
let timerID;

/*　描画処理　*/
// function draw(){
//   let game = document.getElementById('game'); //tableタグを取得
//   let tbody = game.children; //tableタグの子要素tbodyを取得
//   let elemTr = tbody[0].children;//trを取得
//   for(let i = 0; i < elemTr.length; i++){
//     let elemTd = elemTr[i].children; //tdを取得
//     for(j = 0; j < elemTd.length; j++){
//       switch(array[i][j]){ //tableとarrayを照らし合わせ
//         case 0:
//           elemTd[j].className = 'default'; //class名を変更
//          break;
//         case 1 :
//           elemTd[j].className = 'stick';
//          break;
//       }
//     }
//   }
// }
function draw(){
  let game   = document.getElementById('game'); //tableタグを取得
  let tbody  = game.children; //tableタグの子要素tbodyを取得
  let elemTr = tbody[0].children;//trを取得
  for(let i = 0; i < elemTr.length; i++){
    let elemTd = elemTr[i].children; //tdを取得
    for(let j = 0; j < elemTd.length; j++){
      switch(array[i][j]){ //tableとarrayを照らし合わせ
        case 0 :
          elemTd[j].className = 'default'; //class名を変更
         break;
        case 1 :
        case 2 :
          elemTd[j].className = 'stick';
         break;
      }
    }
  }
}

function checkfall(){
  let down = [1,1,1,1,1,1,1,1,1,1]; //ブロック確認用
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      if(down[j] === 1){ //そのマスのブロックの下にブロックがアレば
        if(array[i][j] === 1){ //そのマスのarrayをdownにコピー
          down[j] = 1;
        }else{
          down[j] = 0;
        }
      }else if(down[j] === 0){ //そのマスのブロックの下にブロックがなければ
        if(array[i][j] === 1){ //そのマスは空か、ブロックかの確認
          array[i + 1][j] = array[i][j]; //ブロックであれば１段下げる
          array[i][j]     = 0; //1段下げたのでそのマスを空にする
          down[j]         = 0; //そのマスのarrayをdownにコピー
        }else{
          down[j]         = 0;
        }
      }
    }
  }
}



function fall(){
  let down = [1,1,1,1,1,1,1,1,1,1]; //ブロック確認用
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      if(down[j] === 1){ //そのマスのブロックの下にブロックがアレば
        if(array[i][j] === 2){//そのマスが落下ブロックならば
          readMemory();//ひとつ前の落下処理の状態へ戻す
          moveReadMemory();//ひとつ前の横方向の状態へ戻す
          blockSetBoard();//落下ブロックからただのブロックに変換
        }else if(array[i][j] === 1){ //そのマスがただのブロックならarrayをdownにコピー
          down[j] = 1;
        }else{
          down[j] = 0;
        }
      }else if(down[j] === 0){ //そのマスのブロックの下にブロックがなければ
        if(array[i][j] === 2){ //そのマスは落下ブロックかの確認
          array[i + 1][j] = array[i][j]; //落下ブロックであれば１段下げる
          array[i][j]     = 0; //1段下げたのでそのマスを空にする
          down[j]         = 0; //そのマスのarrayをdownにコピー
        }else if(array[i][j] === 1){//ただのブロックならば
          down[j] = 1;
        }else{
          down[j] = 0;
        }
      }
    }
  }
  boardMemory();
  moveMemory();
}

//盤面記録関数
function boardMemory(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      memory[i][j] = array[i][j];
    }
  }
}

//ブロック移動用盤面記録関数
function moveMemory(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      move[i][j] = array[i][j];
    }
  }
}

//ブロック左右移動用盤面復帰関数
function moveReadMemory(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      array[i][j] = move[i][j];
    }
  }
}

//盤面復帰関数
function readMemory(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      array[i][j] = memory[i][j];
    }
  }
}

//ブロックの固定(当たり判定がでたら落下ブロックをただのブロックに変換)
function blockSetBoard(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      if(array[i][j] === 2){//そのマスが落下ブロックならば
        array[i][j] = 1;
      }
    }
  }
  moveFlag = 0;
}

function checkBlock(){
  for(let i = 0; i < 4; i++){
    for(let j = 3; j < 7; j++){
      if(array[i][j] === 1){
        gameStep = 3;
      }
    }
  }
}
//ブロックの作成
function block() {
  if(moveFlag === 0){
    let bNumber = Math.floor(Math.random() * 4);
    switch (bNumber) {
      case 0:
        array[0][5] = 2;
        array[1][5] = 2;
        array[1][4] = 2;
        array[2][4] = 2;
        break;
      case 1:
        array[0][3] = 2;
        array[0][4] = 2;
        array[0][5] = 2;
        array[0][6] = 2;
        break;
      case 2:
        array[0][4] = 2;
        array[1][4] = 2;
        array[2][4] = 2;
        array[3][4] = 2;;
        break;
      case 3:
        array[0][4] = 2;
        array[0][5] = 2;
        array[1][4] = 2;
        array[1][5] = 2;
        break;
    }
    moveFlag = 1;
  }
}

/*--------------------------------
  ブロック消去
----------------------------------*/

function checkDelete(){
  if(moveFlag === 0){
    for(let i = 19; i >= 0; i--){ //配列の一番下から確認
      if(!array[i].includes(0)){
        for(let j = 0; j < 10; j++){
        array[i][j] = 0;
        }
        checkfall();
      }
    }
    //checkfall();
  }
}

/*--------------------------------
  盤面初期化
----------------------------------*/
function init(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
      array[i][j] = 0;//盤面を全て0にする
    }
  }
  draw();
  moveFlag = 0;
}

//落下ブロックの移動(左)原案
function moveLeft(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    let newMove = array[i].concat();
    for(let j = 1; j < 10; j++){ //行の最初からブロックの確認
      if(newMove[j] === 2){
        if(newMove[j - 1] === 0){
          array[i][j - 1] = 2;
          array[i][j] = 0;
          newMove[j - 1] = newMove[j];
          newMove[j] = 0;
        }else if(newMove[j - 1] === 1){
          moveReadMemory();
        }
      }
    }
  }
  moveMemory();
}

//落下ブロックの移動(左)safe
// function moveLeft(){
//   for(let i = 19; i >= 0; i--){ //配列の一番下から確認
//     let newMove = array[i].concat();
//     for(let j = 0; j < 10; j++){ //行の最初からブロックの確認
//       if(newMove[j] === 2){//そのブロックが移動ブロックで
//        if(newMove[j - 1] === 0){//その次は空か？
//         if((j - 1) === 0){//その空ブロックは0列か
//           if(array[i + 1][0] === 2){//上の列の[0]が2か
//             moveReadMemory();//2ならば元に戻す
//           }else if(array[i - 1][0] === 2){//下の列の[0]が2か
//             moveReadMemory();//2ならば元に戻す
//           }else{
//             array[i][j - 1] = 2;
//             array[i][j]     = 0;
//             newMove[j - 1]  = newMove[j];
//             newMove[j]      = 0;
//           }
//         }else{//0列でなければ
//             array[i][j - 1] = 2;
//             array[i][j]     = 0;
//             newMove[j - 1]  = newMove[j];
//             newMove[j]      = 0;
//         }
//        }else if(newMove[j - 1] === 1){//その次が1のブロックならば
//         moveReadMemory();
//        }
//       }
//     }
//   }
//   moveMemory();
// }

//落下ブロックの移動(右)
function moveRight(){
  for(let i = 19; i >= 0; i--){ //配列の一番下から確認
    let newMove = array[i].concat();
    for(let j = 8; j > -1; j--){ //行の最初からブロックの確認
      if(newMove[j] === 2){
        if(newMove[j + 1] === 0){
          array[i][j + 1] = 2;
          array[i][j] = 0;
          newMove[j + 1] = newMove[j];
          newMove[j] = 0;
        }else if(newMove[j + 1] === 1){
          //moveReadMemory();
        }
      }
    }
  }
  moveMemory();
}

/*--------------------------------
  キー入力
----------------------------------*/
//Chrome v51以上用（笑）
// document.onkeydown = function(event){
//   console.log(event.key);
//   let code = event.key;
//   switch (code) {
//     case 'Enter':
//       block(1);
//       break;
//   }
//   draw();
// }

function keyInput(){
   keyInputNum = event.keyCode;
   console.log(event);
  switch (keyInputNum) {
    case 37  ://ブロックの左移動
      moveLeft();
      break;
    case 39  ://ブロックの右移動
      moveRight();
      break;
  }
  //draw();
}
document.addEventListener('keydown', keyInput, false);

// function keyOut(){
//    keyInputNum = '';
//    console.log(keyInputNum);;
// }
  // document.addEventListener('keyup', keyOut, false);

// document.body.onkeydown = function(event){
//    keyInputNum = event.keyCode;
//    console.log(keyInputNum);
//   switch (keyInputNum) {
//     case 37  ://ブロックの左移動
//       moveLeft();
//       break;
//     case 39  ://ブロックの右移動
//       moveRight();
//       break;
//   }
//   //draw();
// }

// document.body.onkeyup = function(event){
//    keyInputNum = '';
//    console.log(keyInputNum);;
// }





/*--------------------------------
  ゲームのメインルーチン
----------------------------------*/
//メインルーチン
// setInterval(function (){
//   checkDelete();
//   block();
//   fall();
//   draw();
// }, 500);


function gameMain(){
  checkDelete();
  checkBlock();
  block();
  fall();
  draw();
  // let timerId = setTimeout(gameMain, 500)
}

/*--------------------------------
  ゲームの初期画面
----------------------------------*/
function gameStart() {
    init();
    if (keyInputNum === 13) {
      gameStep = 2;
      document.getElementById('game__start').style.display = 'none';
      keyInputNum = '';
    }
}

/*--------------------------------
  ゲームオーバー画面
----------------------------------*/

function gameOver(){
  document.getElementById('game__over').style.display = 'block';
  if (keyInputNum === 32) {
    gameStep = 1;
    document.getElementById('game__start').style.display = 'block';
    document.getElementById('game__over').style.display = 'none';
    keyInputNum = '';
  }
}
/*--------------------------------
  メインルーチン
----------------------------------*/
mainRoutine();
function mainRoutine() {
    timerID = setTimeout(mainRoutine, 500);
    switch (gameStep) {
      case 1:
        gameStart();
        break;
      case 2:
        gameMain();
        break;
      case 3:
        gameOver();
        break;
    }
}