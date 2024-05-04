//window.addEventListener('load', getDb);
function getStatus(){
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
        window.location.href="./streetview.html";
      }
      else{
        console.log("not play");
        //not play状態だったら押された時
        window.location.href="./index.html";
      }
    });
}

function getUserIDstatus() {
  // ローカルストレージからuserIDを取得
  let userID = localStorage.getItem('userID');
  // もしuserIDが存在しない場合、新しいUUIDを生成してローカルストレージに保存
  if (!userID) {
      userID = generateUUIDstatus();
      localStorage.setItem('userID', userID);
  }
  return userID;
}
// UUIDを生成する関数
function generateUUIDstatus() {
  // 乱数を元にUUIDを生成
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

async function saveLocationToDatabase(latitude, longitude) {
  try {
    // ユーザーIDを取得
    var userID = getUserIDstatus();

    // 位置情報とユーザーIDを含むオブジェクトを作成
    const locationData = {
      latitude: latitude,
      longitude: longitude,
      userid: userID
    };

    // POSTリクエストを送信
    const response = await fetch('http://localhost:4000/save-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 位置情報をJSON形式に変換して送信
      body: JSON.stringify(locationData),
    });
  } catch (error) {
    // エラー処理
    console.error('Error:', error);
  }
}