let map, infoWindow;

window.onload = onLoad;

function onLoad() {
  // 開始ボタン作成
  const startButton = document.createElement("button");
  startButton.textContent = "開始処理";
  startButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(startButton);
  startButton.addEventListener("click", startProcess);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 100,
  });

  infoWindow = new google.maps.InfoWindow();
}

function startProcess() {
  // 開始ボタンを非表示にする
  this.classList.add("hidden");

  // 終了ボタン作成
  const endButton = document.createElement("button");
  endButton.textContent = "終了処理";
  endButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(endButton);

  // 終了ボタンがクリックされたときの処理を設定
  endButton.addEventListener("click", endProcess);

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
        title: "開始地点",
      });

      // マーカーがクリックされたときの情報ウィンドウを設定
      marker.addListener("click", () => {
        infoWindow.setContent("開始地点");
        infoWindow.open(map, marker);
      });

      map.setCenter(pos);
    },
    () => {
      handleLocationError(true, infoWindow, map.getCenter());
    }
  );
}

function endProcess() {
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
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("UserPosition");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;
