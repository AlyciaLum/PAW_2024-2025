import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import mime from 'mime'

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
    else if (url.startsWith("/getparams")) {
        const params = new URLSearchParams(url.split("?")[1]);
        console.log(params);

        const fpath = path.join(__dirname, `params${new Date().getTime()}.json`);
        fs.writeFile(fpath, JSON.stringify(params), (err, data) => {
            if (err) throw err;
        });
        res.end(JSON.stringify({'ok':'ok'}));
    }
    else{
        const fpath = path.join('C:/Users/Alycia/PAW_2024-2025/2.10/assets',req.url);
        console.log(req.url);
        fs.access(fpath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({
                    error: 'Not Found',
                    statusCode: 404
                }));
            } else {
                fs.readFile(fpath, (err, data) => {
                    if (err) throw err;
                    else {
                        const fextension = mime.getType(fpath);
                        res.writeHead(200, {'Content-Type': fextension});
                        res.end(data);
                    }
                })
            }
        })
    }
})

server.listen(port, host, () => {
    console.log(`Server started on port ${port}`);
})