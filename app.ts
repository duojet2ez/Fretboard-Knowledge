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

app.post('/leaderboard', async (req, res) => {
  const name = req.body.userName;
  const score = req.body.userScore;
  const query = `
  INSERT INTO leaderboard (name, score)
  VALUES ($1, $2)
`;
  const values = [name, score]; 
  await client.query(query, values, (err, result) => {
    if(err){
      console.log('Error executing', err);
    }
    else{
      console.log('Name and score inserted into database'); 
    }
  });

  const selectQuery = `
    SELECT name, score
    FROM leaderboard
    ORDER BY score DESC
    `;
    const result = await client.query(selectQuery);
    const leaderboardData = result.rows;
    res.json(leaderboardData);
});

app.get('/leaderboard', (req, res) => {
  console.log('get request received');
  //is this right to handle get request from client???
  res.send('Hello from the leaderbard route'); 

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});