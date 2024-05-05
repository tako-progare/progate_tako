//import { getLocation } from './js/GetLocation.js';
import { select_destination } from './js/select_destination.js';
import { endProcess } from './js/EndProcess.js';
import { startProcess } from './js/StartProcess.js';
import { saveLocationToDatabase } from './js/SaveLocation.js';
import { GetGoal } from './js/GetGoal.js';
import { GetStart } from './js/GetStart.js';
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
//const timeLimit = new Timemanager();

//window.onload = onLoad;
if (window.addEventListener) {
  window.addEventListener('load', onLoad);
} else {
  // もし `addEventListener` がサポートされていない場合、古いブラウザの場合に適切に動作するように代替処理を行う
  window.attachEvent('onload', onLoad);
}

function onLoad() {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", Start);
  infoWindow = new google.maps.InfoWindow();
  timeLimit.start();

}
function Start(){
  startProcess(map);
  window.location.href="./streetview.html";
}

/*
function clickGameStart() {
  GetStart();
  // window.location.href="./streetview.html";
}*/


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
    this.UpdateLocation();
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
  UpdateLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 位置情報を取得した後の処理を記述
        console.log("新しい位置情報を取得しました。");
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          // マーカーを作成して地図上に表示
          const marker = new google.maps.Marker({
            position: pos,
            map: map
          });

          
    
          // マーカーがクリックされたときの情報ウィンドウを設定
          marker.addListener("click", () => {
            infoWindow.setContent("現在地");
            infoWindow.open(map, marker);
          });
    
          map.setCenter(pos);
      },
      () => {
        // エラーが発生した場合の処理
        console.error("位置情報の取得に失敗しました。");
      }
    );

    // 5秒ごとに位置情報を更新
    this.timeoutID = setTimeout(() => {
      this.UpdateLocation();
    }, 5000);
  }
}
function hideMarkers() {
  setMapOnAll(null);
}
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}


// タイマーを作成
const timeLimit = new Timemanager();
//window.onload = onLoad;

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

  getLocation((destination) => {
    panorama.setPosition({ lat: destination[0], lng: destination[1] });
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        //infoWindow.setPosition(pos);
        //infoWindow.setContent("UserPosition");
        //infoWindow.open(map);
        //map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}




//上の関数を割り当ててる
window.initPano = initPano;
window.addEventListener('load', initPano);
