export function endProcess() {
    // 終了ボタンを非表示にする
    this.classList.add("hidden");
  
    // ユーザーの現在の位置を取得
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        // マーカーを作成して地図上に表示
        const marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: "終了地点",
        });
  
        // マーカーがクリックされたときの情報ウィンドウを設定
        marker.addListener("click", () => {
          infoWindow.setContent("終了地点");
          infoWindow.open(map, marker);
        });
  
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  
    timeLimit.stop();
  }