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

function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("緯度:", lat);
        console.log("経度:", lng);
        const destination = select_destination(lat, lng);
        callback(destination);
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