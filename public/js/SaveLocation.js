export async function saveLocationToDatabase(latitude, longitude,lat_goal,lon_goal) {
    try {
      // ユーザーIDを取得
      var userID = getUserID();
  
      // 位置情報とユーザーIDを含むオブジェクトを作成
      const locationData = {
        latitude: latitude,
        longitude: longitude,
        userid: userID,
        play:"true",
        lat_goal:lat_goal,
        lon_goal:lon_goal
      };
  
      console.log(locationData);
      // POSTリクエストを送信
      const response = await fetch('http://localhost:4000/save-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 位置情報をJSON形式に変換して送信
        body: JSON.stringify(locationData),
      });
    } catch (error) {
      // エラー処理
      console.error('Error:', error);
    }
  }

  // ローカルストレージからユーザーIDを取得する関数
function getUserID() {
    // ローカルストレージからuserIDを取得
    let userID = localStorage.getItem('userID');
    // もしuserIDが存在しない場合、新しいUUIDを生成してローカルストレージに保存
    if (!userID) {
      userID = generateUUID();
      localStorage.setItem('userID', userID);
    }
    return userID;
}
  // UUIDを生成する関数
function generateUUID() {
    // 乱数を元にUUIDを生成
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
  
  
  
  