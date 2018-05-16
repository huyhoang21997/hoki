const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
// start DAL
var data = fs.readFileSync('./data/product.xml');
var XMLObject = new DOMParser().parseFromString(data.toString());
var key = [];
// tao server
http.createServer(function(req, res) {
  var body = ''; // du lieu gui len tu nguoi dung
  req.on('data', chunk => {
    body += chunk; // convert Buffer to string
  });
  req.on('end', () => {
    var sentItem = 'Error'; // response mac dinh
    if (req.method === 'POST' && req.url === '/login') {
      var authentication = querystring.parse(body);
      if (authentication.username === 'huyhoang' && authentication.password === '1512180') // kiem chung ten dang nhap va mat khau
      {
        sentItem = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // cap key ngau nhien
        key.push(sentItem);
      }
    }
    else if (req.method === 'GET' && req.url === '/data') {
      if (key.find(function(obj) { return obj === body}) != null) // neu da dang nhap
      {
        sentItem = new XMLSerializer().serializeToString(XMLObject);
      }
    }
    res.end(sentItem);
  });
}).listen(3000);