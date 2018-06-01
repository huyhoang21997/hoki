var request = require('request')
var querystring = require('querystring')
var http = require('http')
var fs = require('fs')
var path = require('path')
var DOMParser = require('dom-parser')
var parser = new DOMParser()

function parseCookies(req) {
  var list = {}, rc = req.headers.cookie
  rc && rc.split('').forEach(function(cookie) {
      var parts = cookie.split('=')
      list[parts.shift().trim()] = decodeURI(parts.join('='))
  })
  return list
}

function createServer (data) {
  http.createServer(function(req, res) {
    var cookies = parseCookies(req);
    var user = data.users.find(function(element){
      return cookies.key = element.key
    })
    switch(req.method) {
      case 'GET':
      {
        ////////////////////////////////////////////////////////////////////
        if(req.url.match('\.css$')){
          var cssPath = path.join(__dirname, './public', req.url)
          var fileStream = fs.createReadStream(cssPath, 'utf-8')
          res.writeHead(200, {'Content-Type': 'text/css'})
          fileStream.pipe(res)
        }
        else if(req.url.match('\.png$')){
          var imagePath = path.join(__dirname, '/public', req.url)
          var fileStream = fs.createReadStream(imagePath)
          res.writeHead(200, {'Content-Type': 'image/png'})
          fileStream.pipe(res)
        }
        else if(req.url.match('\.jpg$')){
          var imagePath = path.join(__dirname, '/public', req.url)
          var fileStream = fs.createReadStream(imagePath)
          res.writeHead(200, {'Content-Type': 'image/jpg'})
          fileStream.pipe(res)
        }
        else if(req.url.match('\.js$')){
          var imagePath = path.join(__dirname, './public', req.url)
          var fileStream = fs.createReadStream(imagePath)
          res.writeHead(200, {'Content-Type': 'text/js'})
          fileStream.pipe(res)
        }
        else {
          switch(req.url) {
            case '/':
            {
              // gui ve trang html, tuy theo chung thuc de gui phu hop
              if(user != null) // dang nhap thanh cong
              {
                res.end('Hello World')
                /*
                if(user.role == 'nhanvien') //neu la nhan vien
                {

                }
                else // neu la quan ly
                {

                }
                */
              }
              else {
                res.writeHead(200, {'Contvarent-Type': 'text/html'})
                res.write(fs.readFileSync('./html/home.html').toString())
                res.end()
              }
            }
            break
            case '/data/products':
            {
              res.writeHead(200, { 'Content-Type': 'text/JSON'})
              res.write(JSON.stringify(data.products))
              res.end()
            }
            break
            case '/data/bills':
            {
              if(user != null) {
                res.writeHead(200, { 'Content-Type': 'text/JSON'})
                res.write(JSON.stringify(data.bills))
                res.end()
              }
              else {
                res.writeHead(401)
                res.end()
              }
            }
            break
            // Con thieu nhieu duong dan











          }
        }
      }
      break
      case 'POST':
      {
        var body = ''
        req.on('data', function(chunk) {
          body += chunk
        })
        req.on('end', function() {
          var params = querystring.parse(body)
          
          switch(req.url) {
            case '/login': // dang nhap
            {
              var loginsuccess = false
              var user = data.users.find(function(element) {
                return element.username == params.username
              })
              if(user != null) {
                if(user.password == params.password) {
                  user.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // cap key ngau nhien
                  res.writeHead(302, {
                    'Content-Type': 'text/plain',
                    'Set-Cookie': 'key=' + user.key,
                    'Location': 'http://localhost:3001'
                  })
                  res.end()
                  loginsuccess = true
                }
              }
              if(!loginsuccess){
                res.writeHead(302, {'Location' : 'http://localhost:3001'})
                res.end()
              }
            }
            break
            case '/update': // thay doi thong tin san pham
            break
            case '/newbills': // tao hoa don moi
            break
            case '/logout':
            {
              if(user != null) {
                user.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // xoa key cu
              }
              res.writeHead(302, {'Location': 'http://localhost:3001'})
              res.end()
            }
          }
        })
      }
      break
    }
  }).listen(3001)
}

function getData (key) {
  request({
      headers: {
        'Content-Length': key.length,
        'Content-Type': 'application/raw'
      },
      uri: 'http://localhost:3000/data',
      body: key,
      method: 'GET'
    }, function(err, res, data) {
      if (err) {
        console.log(err)
      }
      else {
        // 7. Cache du lieu nhan tu dal, tao server bus
        createServer(JSON.parse(data))
      }
    }
  )
}

function login() {
  var form = {
    username: 'huyhoang',
    password: '1512180',
  }
  var formData = querystring.stringify(form)
  request(
    {
      headers: {
        'Content-Length': formData.length,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      uri: 'http://localhost:3000/login',
      body: formData,
      method: 'POST'
    }, function (err, res, data) {
      if (err) {
        console.log(err)
      }
      else {
        // 5. Nhan ma xac nhan tu dal, gui yeu cau lay du lieu kem theo ma xac nhan
        getData(data)
      }
    }
  )
}
// 3. Gui xac nhan bus cho dal
login()