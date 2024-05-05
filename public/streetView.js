import { GetGoal } from './js/GetGoal.js'


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

if (window.addEventListener) {
    window.addEventListener('load', onLoad);
  } else {
    // もし `addEventListener` がサポートされていない場合、古いブラウザの場合に適切に動作するように代替処理を行う
    window.attachEvent('onload', onLoad);
  }
  
  function onLoad() {
    console.log("map create");
    const playok = document.getElementById("playok");
    playok.addEventListener("click", Play);
    const playno = document.getElementById("playno");
    playno.addEventListener("click", PlayNo);
    infoWindow = new google.maps.InfoWindow();
  
  }
  function Play(){
    window.location.href="./play.html";
  }
  function PlayNo(){
    window.location.href="./index.html";
  }
  


async function initPano() {
  try{
    const destination = await GetGoal(); // 目的地の座標を取得
    console.log("test", destination); // destination オブジェクトのプロパティを個々にログ出力
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
    panorama.setPosition({ lat: destination.latitude, lng: destination.longitude }); // パノラマの表示位置を目的地に設定
  }catch (error) {
    console.error('Error initializing panorama:', error);
  }
}

//上の関数を割り当ててる
window.initPano = initPano;
window.addEventListener('load', initPano);