import { select_destination } from './select_destination.js';
import { saveLocationToDatabase } from './SaveLocation.js';
import { handleLocationError } from './handleLocationError.js';

export async function startProcess() {
    try {
      //すでにuuidがあるか確認
      //await getDb();

      // 目的地の取得
     // const destination = await GetGoal();

      // 目的地の緯度と経度をコンソールに出力

      // ユーザーの現在の位置を取得
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          console.log("現在地：",pos);

          // マーカーを作成して地図上に表示
          /*const marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: "開始地点",
          });*/

         /* // マーカーがクリックされたときの情報ウィンドウを設定
          marker.addListener("click", () => {
            infoWindow.setContent("開始地点");
            infoWindow.open(map, marker);
          });
          if (GetGoal()){
            // 目的地の取得
          }*/
          const destination=select_destination(pos.lat,pos.lng);

          // 位置情報をデータベースに保存
          saveLocationToDatabase(pos.lat, pos.lng,destination[0],destination[1]);

          // マップの中心を現在地に
          map.setCenter(pos);
          // マップの拡大率を変更
          map.setZoom(15);


          console.log("aaaaaa",GetGoal());
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } catch (error) {
      console.error(error);
    }
  }