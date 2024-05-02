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

  //パノラマ変更時、新しいパノラマ画像のIDをpano-cell要素内に表示する処理
  panorama.addListener("pano_changed", () => {
    const panoCell = document.getElementById("pano-cell");

    panoCell.innerHTML = panorama.getPano();
  });

  //リンク変更時のイベントリスナー
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

  //位置変更時、新しい位置情報をposition-cell要素内に表示する処理
  panorama.addListener("position_changed", () => {
    const positionCell = document.getElementById("position-cell");

    positionCell.firstChild.nodeValue = panorama.getPosition() + "";
  });

  //POV(視点)変更時、新しいPOV情報をheading-cellとpitch-cell要素内に表示する処理
  panorama.addListener("pov_changed", () => {
    const headingCell = document.getElementById("heading-cell");
    const pitchCell = document.getElementById("pitch-cell");

    headingCell.firstChild.nodeValue = panorama.getPov().heading + "";
    pitchCell.firstChild.nodeValue = panorama.getPov().pitch + "";
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


function select_destination(lat_n = 0, lng_n = 0, D = 0.1) {

  // ランダムなパラメータr,thetaを宣言
  const r = Math.random(),
        theta = Math.random() * (Math.PI);

  // 目的地の緯度，経度を計算
  const lat_d = D * r * Math.cos(theta) + lat_n,
        lng_d = D * r * Math.sin(theta) + lng_n;
        console.log(lat_d);

  // 目的地の緯度，経度を配列に入れて返す
  const destination = [lat_d, lng_d];
  console.log(destination);
  return destination;
}

//上の関数を割り当ててる
window.initPano = initPano;
window.addEventListener('load', initPano);