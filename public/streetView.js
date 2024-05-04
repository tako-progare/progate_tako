import { GetGoal } from './js/GetGoal.js'

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