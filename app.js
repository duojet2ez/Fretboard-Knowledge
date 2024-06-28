"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const path = require('path');
const { Client, Pool } = require('pg');
require('dotenv').config();
const app = express();
const client = new Client();
client.connect();
// Use the port provided by Heroku, or fallback to a default port
const port = process.env.PORT || 3000;
// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
//need this to parse json req body
app.use(express.json());
app.post('/leaderboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.userName;
    const score = req.body.userScore;
    const query = `
  INSERT INTO leaderboard (name, score)
  VALUES ($1, $2)
`;
    const values = [name, score];
    yield client.query(query, values, (err, result) => {
        if (err) {
            console.log('Error executing', err);
        }
        else {
            console.log('Name and score inserted into database');
        }
    });
    const selectQuery = `
    SELECT name, score
    FROM leaderboard
    ORDER BY score DESC
    `;
    const result = yield client.query(selectQuery);
    const leaderboardData = result.rows;
    res.json(leaderboardData);
}));
app.get('/leaderboard', (req, res) => {
    console.log('get request received');
    //is this right to handle get request from client???
    res.send('Hello from the leaderbard route');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
