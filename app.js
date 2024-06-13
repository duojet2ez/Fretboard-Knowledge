"use strict";
const express = require('express');
const path = require('path');
const { Client, Pool } = require('pg');
require('dotenv').config();
const app = express();
/*
async function connectAndQuery() {
  try {
    const client = new Client();
    await client.connect();

    // Execute your queries here
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    console.log('wow');

    await client.end();
  } catch (error) {
    console.error('Error:', error);
  }
}

connectAndQuery();

*/
// Use the port provided by Heroku, or fallback to a default port
const port = process.env.PORT || 3000;
// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
