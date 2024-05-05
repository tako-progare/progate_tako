
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
            marker.setMap(map);
  
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
  // タイマーを作成
const timeLimit = new Timemanager();



if (window.addEventListener) {
    window.addEventListener('load', onLoad);
  } else {
    // もし `addEventListener` がサポートされていない場合、古いブラウザの場合に適切に動作するように代替処理を行う
    window.attachEvent('onload', onLoad);
  }
  
  function onLoad() {
    const guess = document.getElementById("guess");
    guess.addEventListener("click", Play);
    infoWindow = new google.maps.InfoWindow();
    timeLimit.start();
  
  }
  function Play(){
    window.location.href="./result.html";
  }
  