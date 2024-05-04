function GetGoal() {
  const params = {
    userid: localStorage.getItem('userID'),
  }
  const query_params = new URLSearchParams(params); 

  return fetch('http://localhost:4000/goal_location?' + query_params)
    .then(response => response.json())
    .then(response => {
      // サーバーから取得した位置情報のうち、緯度と経度のみを取得
      const latitude = response[0].lat_goal; // 配列の0番目の要素から緯度を取得
      const longitude = response[0].lon_goal; // 配列の0番目の要素から経度を取得

      return { latitude, longitude }; // 緯度と経度の情報のみを返す
    })
    .catch(error => {
      console.error('Error fetching location from database:', error);
    });
}
async function initPano() {
  try{
    const destination = await GetGoal(); // 目的地の座標を取得
    console.log("test"+destination)
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


function select_destination(lat_n = 0, lng_n = 0, D = 100) {
    let geod = geodesic.Geodesic.WGS84, r;

    // ランダムなパラメータd,thetaを宣言
    const theta = Math.random() * 360,
          d = Math.random();

    // 目的地の緯度，経度を計算
    r = geod.Direct(lat_n, lng_n, theta, D*d);

    // 目的地の緯度，経度を配列に入れて返す
    const destination = [r.lat2, r.lon2];
    return destination;
}

//上の関数を割り当ててる
window.initPano = initPano;
window.addEventListener('load', initPano);