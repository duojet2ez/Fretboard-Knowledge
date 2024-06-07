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
const app = express();
const pool = new Pool();
function connectAndQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new Client();
            yield client.connect();
            // Execute your queries here
            const res = yield client.query('SELECT NOW()');
            console.log(res.rows[0]);
            console.log('wow this is cool');
            yield client.end();
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
connectAndQuery();
// Use the port provided by Heroku, or fallback to a default port
const port = process.env.PORT || 3000;
// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
