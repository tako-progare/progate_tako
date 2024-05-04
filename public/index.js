let map, infoWindow;

let destinationRange = 100;

//initMap 呼び出し
//mapを作成する
window.initMap = initMap;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.68224057589321, lng: 139.76728396076678 },
    zoom: 15,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
  });

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
}

// タイマーを作成
const timeLimit = new Timemanager();

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
/*
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
*/
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

function calc_score(lat_start, lng_start, lat_goal, lng_goal){
  let geod = geodesic.Geodesic.WGS84, r;

  r = geod.Inverse(lat_start, lng_start, lat_goal, lng_goal);
  console.log("Distance is " + r.s12.toFixed(3) + "m.");

  const score = max_point - (r.s12 / destinationRange) * max_point;

  console.log("score is " + socre + "!");
  return [r.s12, score];
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

function initPano() {
  //パノラマの初期化
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: { lat: 0, lng: 0},
      pov: {
        //カメラ中心の回転角度を、真北からの相対角度で定義します。
        heading: 270,
        //カメラの初期デフォルト ピッチからの「上」または「下」向きの角度を定義します
        pitch: 0,
      },
      visible: true,
    },
  );
/*
  navigator.geolocation.getCurrentPosition(
    (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

      const destination = selectdestination(lat, lng);

      panorama.setPosition({ lat: destination[0], lng: destination[1]});
    },
    () => {
      handleLocationError(true, infoWindow, map.getCenter());
    }
  );
*/
  //パノラマ変更時、新しいパノラマ画像のIDをpano-cell要素内に表示する処理
  /*
  panorama.addListener("pano_changed", () => {
    const panoCell = document.getElementById("pano-cell");

    panoCell.innerHTML = panorama.getPano();
  });
  */

  //リンク変更時のイベントリスナー
  /*
  panorama.addListener("links_changed", () => {
    const linksTable = document.getElementById("links_table");

    //linksTableの中身を一旦クリアする
    while (linksTable.hasChildNodes()) {
      linksTable.removeChild(linksTable.lastChild);
    }

    //新しいリンクの情報を取得し、linksTableに追加する
    const links = panorama.getLinks();

    for (const i in links) {
      const row = document.createElement("tr");

      linksTable.appendChild(row);

      const labelCell = document.createElement("td");

      labelCell.innerHTML = "<b>Link: " + i + "</b>";

      const valueCell = document.createElement("td");

      valueCell.innerHTML = links[i].description;
      linksTable.appendChild(labelCell);
      linksTable.appendChild(valueCell);
    }
  });
  */

  //位置変更時、新しい位置情報をposition-cell要素内に表示する処理
  /*
  panorama.addListener("position_changed", () => {
    const positionCell = document.getElementById("position-cell");

    positionCell.firstChild.nodeValue = panorama.getPosition() + "";
  });
  */

  //POV(視点)変更時、新しいPOV情報をheading-cellとpitch-cell要素内に表示する処理
  /*
  panorama.addListener("pov_changed", () => {
    const headingCell = document.getElementById("heading-cell");
    const pitchCell = document.getElementById("pitch-cell");

    headingCell.firstChild.nodeValue = panorama.getPov().heading + "";
    pitchCell.firstChild.nodeValue = panorama.getPov().pitch + "";
  });
  */
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("緯度:", lat);
        console.log("経度:", lng);
      },
      () => {
        console.error("Error: ユーザーの位置情報を取得できませんでした");
      }
    );
  } else {
    console.error("Error: ブラウザが位置情報サービスをサポートしていません");
  }
}


function select_destination(lat_n = 0, lng_n = 0, D = 100) {
    let geod = geodesic.Geodesic.WGS84, r;
    destinationRange = D;

    // ランダムなパラメータd,thetaを宣言
    const theta = Math.random() * 360,
          d = Math.random();

    // 目的地の緯度，経度を計算
    r = geod.Direct(lat_n, lng_n, theta, D*d);
    console.log("The Destination is (" + r.lat2.toFixed(8) + "," + r.lon2.toFixed(8) + ").")
    console.log(typeof r.lat2.toFixed(8));
    console.log(typeof r.lon2.toFixed(8));

    // 目的地の緯度，経度を配列に入れて返す
    const destination = [r.lat2, r.lon2];
    return destination;
}

//上の関数を割り当ててる
window.initPano = initPano;
window.addEventListener('load', initPano);