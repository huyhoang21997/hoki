const querystring = require('querystring');
const request = require('request');
const http = require('http');

function createServer (data) {
  http.createServer(function(req, res) {
    res.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Method': 'GET', 'Content_Type': 'text/xml' });
    res.end(data);
  }).listen(3001);
}

function getData (data) {
  contentLength = data.length;
  request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/raw'
      },
      uri: 'http://localhost:3000/data',
      body: data,
      method: 'GET'
    }, function(err, res, data) {
      if (err) {
        console.log(err);
      }
      else {
        createServer(data);
      }
    }
  );
}

function login() {
  var form = {
    username: 'huyhoang',
    password: '1512180',
  };
  var formData = querystring.stringify(form);
  var contentLength = formData.length;
  request(
    {
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      uri: 'http://localhost:3000/login',
      body: formData,
      method: 'POST'
    }, function (err, res, data) {
      if (err) {
        console.log(err);
      }
      else {
        getData(data);
      }
    }
  );
}

login();