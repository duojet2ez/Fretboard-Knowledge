const http = require('http');
const {readFileSync} = require('fs'); 
const fs = require('fs');  

const hostname = '127.0.0.1';
const port = 3000;

const homePage = readFileSync('./index.html');
const scriptLoad = readFileSync('./game.js'); 
const style = readFileSync('./style.css'); 

const server = http.createServer((req, res) => {
    const url = req.url
    if(url === '/'){
        res.writeHead(200, {'content-type':'text/html'}); 
        res.write(homePage); 
        console.log('home page found');
        res.end(); 
    }
    else if(url === '/style.css'){
        console.log('stylesheet found'); 
        res.writeHead(200, {'content-type':'text/css'});
        res.write(style);
        res.end(); 
    }
    else if(url === '/game.js'){
        console.log('script found'); 
        res.writeHead(200, {'content-type':'text/javascript'});
        res.write(scriptLoad);
        res.end();
    }

});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});