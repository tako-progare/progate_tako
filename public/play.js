
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
    const guess = document.getElementById("guess");
    guess.addEventListener("click", Play);
    infoWindow = new google.maps.InfoWindow();
  
  }
  function Play(){
    window.location.href="./result.html";
  }
  