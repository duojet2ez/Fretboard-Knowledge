const express = require('express');
const path = require('path');

const app = express();

// Use the port provided by Heroku, or fallback to a default port
const port = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});