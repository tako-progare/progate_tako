//window.addEventListener('load', getDb);
/*
function getDb(){
  const params = {
    userid: localStorage.getItem('userID'),
  }
  const query_params = new URLSearchParams(params);
  fetch('http://localhost:4000/status?' + query_params)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      if(response[0].play){
        console.log("play");
        //play状態だったら押された時
        //window.location.href="./index.html";
        //window.location.href="./streetview.html";
      }
      else{
        console.log("not play");
        //not play状態だったら押された時
        window.location.href="./index.html";
      }
    });
}*/

function getUserID() {
  // ローカルストレージからuserIDを取得
  let userID = localStorage.getItem('userID');
  // もしuserIDが存在しない場合、新しいUUIDを生成してローカルストレージに保存
  if (!userID) {
      userID = generateUUID();
      localStorage.setItem('userID', userID);
  }
  return userID;
}
// UUIDを生成する関数
function generateUUID() {
  // 乱数を元にUUIDを生成
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}