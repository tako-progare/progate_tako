//expressモジュールをインポートし、Expressアプリケーションを作成
const express = require("express");
const app = express();

//pgモジュールをインポートし、PostgreSQLのクライアントプールを作成
const pg = require("pg");

var pgPool = new pg.Pool({
  database: "tako_db",
  user: "tako_db_user",
  password: "HcrV9IsGJ5ABl7fCczABYYaJq1In7Wxz",
  host: "dpg-coqo5ma1hbls73er0f7g-a.singapore-postgres.render.com",
  port: 5432,
  ssl: {rejectUnauthorized:false},
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  if ('OPTIONS' === req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
//ExpressアプリケーションでGETリクエストのハンドラを定義。ルートパス(/)へのGETリクエストがあった場合、"Hello World!"というメッセージを返す
app.get("/", function (req, res) {
  res.sendStatus("Hello World!");
});
app.post('/save-location', async (req, res) => {
  try {
    // リクエストから緯度と経度を取得
    const { latitude, longitude,userid,play } = req.body;

    // ここで取得した位置情報をデータベースに保存する処理を実行
    // 例えば、以下のようにPostgreSQLを使用してデータベースに挿入する処理を記述することができます
    const query = {
      text: 'INSERT INTO locations (latitude, longitude,userid,play) VALUES ($1, $2, $3, $4)',
      values: [latitude, longitude,userid,play],
    };

    await pgPool.query(query);

    // データベースに保存が成功したことをクライアントに返す
    res.status(200).send('Location saved to database successfully.');
  } catch (error) {
    // エラーが発生した場合はエラーメッセージをクライアントに返す
    console.error('Error saving location to database:', error);
    res.status(500).send('Error saving location to database.');
  }
});
//ExpressアプリケーションでPOSTリクエストのハンドラを定義 /createへのPOSTリクエストがあった場合、指定されたデータをデータベースのTestClassesテーブルに挿入
app.post("/create", function (req, res) {
  var query = {
    text:
      'INSERT INTO public."TestClasses" (id, attr1, "createdAt", "updatedAt") VALUES($1, $2, current_timestamp, current_timestamp)',
    values: [10000, "test"],
  };

  pgPool.connect(function (err, client) {
    if (err) {
      console.log(err);
    } else {
      client
        .query(query)
        .then(() => {
          res.send("Data Created.");
        })
        .catch((e) => {
          console.error(e.stack);
        });
    }
  });
});
//Expressアプリケーションをポート3000でリッスンし、起動メッセージを表示
app.listen(4000, () => console.log("Example app listening on port 5000!"));


app.get("/locations",(req,res) => {
  let userid = req.query.userid
  let playUser = req.query.playUser
  
  const query = {
      text: 'SELECT latitude,longitude,userid,play FROM locations WHERE userid = $1 AND play = $2',
      values: [userid, playUser],
  };
  pgPool.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result.rows);
    }
  });
})
