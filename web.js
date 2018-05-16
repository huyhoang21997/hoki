const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function(req, res) {
    if(req.url === '/') {
        res.writeHead(200, {'Contvarent-Type': 'text/html'});
        res.end(fs.readFileSync('./html/index.html').toString());
    }
    else if(req.url === '/productlist') {
        res.writeHead(200, {'Contvarent-Type': 'text/html'});
        res.end(fs.readFileSync('./html/productlist.html').toString());
    }
    else if(req.url === '/details') {
        res.writeHead(200, {'Contvarent-Type': 'text/html'});
        res.end(fs.readFileSync('./html/details.html').toString());
    }
    else if(req.url.match('\.css$')){
        var cssPath = path.join(__dirname, './public', req.url);
        var fileStream = fs.createReadStream(cssPath, 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res);
    }
    else if(req.url.match('\.png$')){
        var imagePath = path.join(__dirname, '/public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {'Content-Type': 'image/png'});
        fileStream.pipe(res);
    }
    else if(req.url.match('\.jpg$')){
        var imagePath = path.join(__dirname, '/public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        fileStream.pipe(res);
    }
    else if(req.url.match('\.js$')){
        var imagePath = path.join(__dirname, './public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {'Content-Type': 'text/js'});
        fileStream.pipe(res);
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('No Page Found');
    }
}).listen(3002);