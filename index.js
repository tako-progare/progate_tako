//変数の宣言
let map, infoWindow;
//図を初期化するための関数 Google Maps APIが読み込まれたときに呼び出される
function initMap() {
  //変数に新しいGoogle マップのインスタンスを作成し、指定されたHTML要素（idが"map"）にマップを配置する
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  //変数に新しい情報ウィンドウのインスタンスを作成する マーカなどの関連した場所を表示するために使用
  infoWindow = new google.maps.InfoWindow();
  //ボタン要素を作成する
  const locationButton = document.createElement("button");
  //ボタンのテキストを設定
  locationButton.textContent = "Pan to Current Location";
  //ボタンにクラスを追加 css用
  locationButton.classList.add("custom-map-control-button");
  //作成したボタンを地図のコントロールに追加 この場合は地図の中央上部
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  //ボタンがクリックされたときに実行されるイベントリスナーを追加
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      //HTML5のGeolocation APIを使用して、ユーザーの現在の位置を取得します。
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}
//位置情報の取得中にエラーが発生した場合に呼び出される関数サービスの失敗時に適切なエラーメッセージを表示
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
//オブジェクトのプロパティとして設定し、これによってグローバルスコープで関数が利用可能になる
window.initMap = initMap;
