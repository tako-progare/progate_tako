function select_destination(lat_n = 0, lng_n = 0, D = 1) {

    // ランダムなパラメータr,thetaを宣言
    const r = Math.random(),
          theta = Math.random() * (Math.PI);

    // 目的地の緯度，経度を計算
    const lat_d = D * r * Math.sin(theta) + lat_n,
          lng_d = D * r * Math.cos(theta) + lng_n;

    // 目的地の緯度，経度を配列に入れて返す
    const destination = [lat_d, lng_d];
    return destination;
}