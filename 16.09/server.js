const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const host = '127.0.0.1';

const server = http.createServer((req, res) => {
    const url = req.url;

    if(url === "/"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Strona Główna`)
    }
    else if(url === "/json"){
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        const json = {"Hello" : "World"}
        res.end(JSON.stringify(json))
    }
    else if(url === "/html"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        const html = "<html><head><title>Strona Html</title></head><body> <h1>dokument html</h1> </body></html>"
        res.end(html)
    }
    else if(url === "/html2"){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        fs.readFile(path.join('index.html'), (err, data) => {
            if(err)throw err;
            else {res.end(data);}
        })
    }

})

server.listen(port, host, () => {
    console.log(`Server started on port ${port}`);
})