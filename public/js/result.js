
let map, infoWindow;
let pos; // pos変数を定義
let destinationRange = 100;

async function onLoadResult() {
  try {
    //map 作成
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.68224057589321, lng: 139.76728396076678 },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
    });

    const start = await GetStart();

    //現在地取得
    navigator.geolocation.getCurrentPosition(
        (position) => {
            goalPoint = { // pos変数を設定
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            console.log("golaPoint",goalPoint);

            // marker 設置
            createMarker(goalPoint);
            // map 中心を現在地にする
            map.setCenter(goalPoint);

            /*// ゴール地点を設定
                        const goalPoint = {
                lat: 35.25648893858805,
                lng: 136.86178013538338
            };*/

            //スタート地点を設定
            const startPoint = {
                lat: start.latitude,
                lng: start.longitude,
            }

            // marker 設置
            createMarker(startPoint);

            // 現在地とゴール地点の間に線を引く
            var line = new google.maps.Polyline({ path: [goalPoint, startPoint], map: map });

            // 距離計算
            var result = calc_score(startPoint.lat, startPoint.lng, goalPoint.lat, goalPoint.lng);
            console.log("result:",result);

            var resultMeter=document.getElementById("result-meter");
            resultMeter.innerHTML=Math.floor(result[0])+"m";
            let resultScore=document.getElementById("result-score");
            resultScore.innerHTML=Math.floor(result[1]);

        },
        () => {
            handleLocationError(true, infoWindow, map.getCenter());
        }
    );
  }catch (error) {
    console.error('Error initializing panorama:', error);
  }
}

function createMarker(Point) {
    // マーカーを作成して地図上に表示
    const marker = new google.maps.Marker({
        position: Point,
        map: map,
        title: "終了地点",
    });
}

function haversine_distance(mk1, mk2) {
    console.log(mk1);
    var R = 6371; // 地球の半径（km）
    var lat1 = mk1.lat * (Math.PI / 180); // mk1の緯度をラジアンに変換
    var lat2 = mk2.lat * (Math.PI / 180); // mk2の緯度をラジアンに変換
    var dLat = lat2 - lat1; // 緯度の差（ラジアン）
    var dLng = (mk2.lng - mk1.lng) * (Math.PI / 180); // 経度の差（ラジアン）

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c * 1000; // 距離（km）
    return distance;
}

function GetStart() {
    const params = {
      userid: localStorage.getItem('userID'),
    }
    const query_params = new URLSearchParams(params);

    return fetch('https://progate-tako-1.onrender.com/locations?' + query_params)
      .then(response => response.json())
      .then(response => {
        console.log("response:",response);
        // サーバーから取得した位置情報のうち、緯度と経度のみを取得
        const latitude = response[0].latitude; // 配列の0番目の要素から緯度を取得
        const longitude = response[0].longitude; // 配列の0番目の要素から経度を取得

        console.log("response:",latitude);

        return { latitude, longitude }; // 緯度と経度の情報のみを返す
      })
      .catch(error => {
        console.error('Error fetching location from database:', error);
      });
}

function calc_score(lat_start, lng_start, lat_goal, lng_goal){
  let geod = geodesic.Geodesic.WGS84, r;

  r = geod.Inverse(lat_start, lng_start, lat_goal, lng_goal);
  console.log("Distance is " + r.s12.toFixed(3) + "m.");
  max_point = 5000;

  const score = Math.max(0, max_point - (r.s12 / destinationRange) * max_point);

  console.log("score is " + score + "!");
  return [r.s12, score];
}