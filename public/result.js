let map, infoWindow;
let pos; // pos変数を定義

function onLoadResult() {
    //map 作成
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.68224057589321, lng: 139.76728396076678 },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
    });

    //現在地取得
    navigator.geolocation.getCurrentPosition(
        (position) => {
            pos = { // pos変数を設定
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            // marker 設置
            createMarker(pos);
            // map 中心を現在地にする
            map.setCenter(pos);

            // ゴール地点を設定
            const goalPoint = {
                lat: 35.25648893858805,
                lng: 136.86178013538338
            };

            // marker 設置
            createMarker(goalPoint);

            // 現在地とゴール地点の間に線を引く
            var line = new google.maps.Polyline({ path: [pos, goalPoint], map: map });

            // 距離計算
            var distance = Math.trunc(haversine_distance(pos, goalPoint));
            console.log(distance);

            var resultMeter=document.getElementById("result-meter");
            resultMeter.innerHTML=distance+"m";

        },
        () => {
            handleLocationError(true, infoWindow, map.getCenter());
        }
    );
}

function createMarker(goalPoint) {
    // マーカーを作成して地図上に表示
    const marker = new google.maps.Marker({
        position: goalPoint,
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