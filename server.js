const express = require('express');
const app = express();
const path = require('path');

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

// ポート3000でサーバーを起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
