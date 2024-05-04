let map, infoWindow;


//initMap 呼び出し
//mapを作成する
window.initMap = initMap;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.68224057589321, lng: 139.76728396076678 },
    zoom: 15,
    time.textContent = '${h}:${m}:${s}';
    time.textContent = '${h}:${m}:${s}';
    timeoutID = setTimeout(displaytime, 10);
  }
}

// タイマーを作成
const timeLimit = new Timemanager();
*/


window.onload = onLoad;

function onLoad() {
  /*
  // 開始ボタン作成
  const startButton = document.createElement("button");
  startButton.textContent = "開始処理";
  startButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(startButton);
  startButton.addEventListener("click", startProcess);
  */

  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startProcess);

  infoWindow = new google.maps.InfoWindow();

  startProcess();

  console.log("map create");
}

function startProcess() {

  getDb();
/*
  // 終了ボタン作成
  const endButton = document.createElement("button");
  endButton.textContent = "終了処理";
  endButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(endButton);


  // getDb();


  /*
    // 終了ボタン作成
    const endButton = document.createElement("button");
    endButton.textContent = "終了処理";
    endButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(endButton);
  
    // 終了ボタンがクリックされたときの処理を設定
    endButton.addEventListener("click", endProcess);*/



  // ユーザーの現在の位置を取得
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      console.log("現在地："+pos);

      // マーカーを作成して地図上に表示
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "開始地点",
      });

      // マーカーがクリックされたときの情報ウィンドウを設定
      marker.addListener("click", () => {
        infoWindow.setContent("開始地点");
        infoWindow.open(map, marker);
      });

      console.log(pos.lat, pos.lng);

       // 位置情報をデータベースに保存

      saveLocationToDatabase(pos.lat, pos.lng);

      // マップの中心を現在地に
      map.setCenter(pos);
      //まマップの拡大率を変更
      map.setZoom(15);
    },
    () => {
      handleLocationError(true, infoWindow, map.getCenter());
    }
  );
  /*
    // 制限時間開始
    timeLimit.start();*/
}

function endProcess() {
  // 終了ボタンを非表示にする
  this.classList.add("hidden");

  // ユーザーの現在の位置を取得
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // マーカーを作成して地図上に表示
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: "終了地点",
      });

      // マーカーがクリックされたときの情報ウィンドウを設定
      marker.addListener("click", () => {
        infoWindow.setContent("終了地点");
        infoWindow.open(map, marker);
      });

      map.setCenter(pos);
    },
    () => {
      handleLocationError(true, infoWindow, map.getCenter());
    }
  );

  timeLimit.stop();
}

function getLocation() {
  console.log("getLocation Start");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("UserPosition");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// ローカルストレージからユーザーIDを取得する関数
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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
async function saveLocationToDatabase(latitude, longitude) {
  try {
    // ユーザーIDを取得
    var userID = getUserID();

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

function getDb() {
  const params = {
    userid: localStorage.getItem('userID'),
  }
  const query_params = new URLSearchParams(params);
  fetch('http://localhost:4000/locations?' + query_params)
    .then(response => response.json())
    .then(response => {
      console.log(response);
    });
}

//game start button 押された時
function clickGameStart(){
  window.location.href="./streetview.html";
}

//yes button 押された時
function clickYes(){
  window.location.href="./play.html";
}

//no button 押された時
function clickNo(){
  window.location.href="./index.html";
}

//GUESS button 押された時
function clickGuess(){
  window.location.href="./result.html";
}





/*
class Timemanager {
  constructor() {
    this.startTime;
    this.stoptime;
    this.timeoutID;
  }

  // メソッド
  // 計測開始
  start() {
    this.startTime = Date.now();
    this.displaytime();
  }

  // 計測停止
  stop() {
    this.stopTime = Date.now();
    clearTimeout(timeoutID);
  }

  // リセット
  reset() {
    time.textContent = '00:00:00';
    this.stopTime = 0
  }

  // 経過時間を表示
  displaytime() {
    const time =document.getElementById('');

    const currentTime = new Date(Date.now() - this.startTime);
    const h = String(currentTime.getHours()-1).padStart(2, '0');
    const m = String(currentTime.getMinutes()).padStart(2, '0');
    const s = String(currentTime.getSeconds()).padStart(2, '0');
    const ms = String(currentTime.getMilliseconds()).padStart(2, '0');

    time.textContent = '${h}:${m}:${s}';
    timeoutID = setTimeout(displaytime, 10);
  }
}

// タイマーを作成
const timeLimit = new Timemanager();
/*
window.onload = onLoad;
/*
function onLoad() {
  // 開始ボタン作成
  const startButton = document.createElement("button");
  startButton.textContent = "開始処理";
  startButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(startButton);
  startButton.addEventListener("click", startProcess);
}*/

