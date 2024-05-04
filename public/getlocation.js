function getLocationsFromDatabase() {
    fetch('/get-locations')
    .then(response => response.json())
    .then(data => {
      // 取得した位置情報を利用する
      console.log('Locations retrieved from database:', data);
      // 位置情報をマップ上に表示するなどの処理をここに追加する
    })
    .catch(error => {
      console.error('Error fetching locations from database:', error);
    });
  }