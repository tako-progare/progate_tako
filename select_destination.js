function select_destination(lat_n = 0, lng_n = 0, D = 100) {
    let geod = geodesic.Geodesic.WGS84, r;

    // ランダムなパラメータd,thetaを宣言
    const theta = Math.random() * 360,
          d = Math.random();

    // 目的地の緯度，経度を計算
    r = geod.Direct(lat_n, lng_n, theta, D*d);
    console.log("The Destination is (" + r.lat2.toFixed(8) + "," + r.lon2.toFixed(8) + ").")

    // 目的地の緯度，経度を配列に入れて返す
    const destination = [r.lat2, r.lon2];
    return destination;
}