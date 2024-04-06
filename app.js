const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});