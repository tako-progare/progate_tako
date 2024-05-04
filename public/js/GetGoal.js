export function GetGoal() {
  const params = {
    userid: localStorage.getItem('userID'),
  }
  const query_params = new URLSearchParams(params);

  return fetch('http://localhost:4000/goal_location?' + query_params)
    .then(response => response.json())
    .then(response => {
      // サーバーから取得した位置情報のうち、緯度と経度のみを取得
      const latitude = response[0].lat_goal; // 配列の0番目の要素から緯度を取得
      const longitude = response[0].lon_goal; // 配列の0番目の要素から経度を取得
      console.log("responce:",response);
      console.log("params:",params);
      return { latitude, longitude }; // 緯度と経度の情報のみを返す
    })
    .catch(error => {
      console.error('Error fetching location from database:', error);
    });
}