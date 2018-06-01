var fs = require('fs')
var http = require('http')
var querystring = require('querystring')
/* 0. Tao du lieu dang nhap cho nguoi dung(username, password, role)
var nhanvien = {
  username: 'phamhuyhoang',
  password: '1512180',
  role: 'nhanvien'
}
var quanly = {
  username: 'nguyenanhkiet',
  password: '1512270',
  role: 'quanly'
}
var arr = []
arr.push(nhanvien)
arr.push(quanly)
fs.writeFileSync("./data/user.json", JSON.stringify(arr));*/
// 1. Doc du lieu nguoi dung, san pham, cua hang
var users_arr = JSON.parse(fs.readFileSync('./data/users.json').toString())
var products_arr = JSON.parse(fs.readFileSync('./data/products.json').toString())
var bills_arr = JSON.parse(fs.readFileSync('./data/bills.json').toString())
function send_suscess_res(data, type, res) {
  res.writeHead(200, { 'Content-Type': type })
  res.write(data)
  res.end()
}
function send_fail_res(res) {
  res.writeHead(401)
  res.end()
}
// 2. Tao server xu ly yeu cau post
var key = [];
http.createServer(function(req, res) {

  var body = '' // du lieu gui len tu nguoi dung
  req.on('data', chunk => {
    body += chunk // convert Buffer to string
  });
  req.on('end', () => {
    switch(req.url) {
      case '/login':
        var authentication = querystring.parse(body);
        // 4. Neu dang nhap thanh cong, gui ma xac nhan cho bus
        if (req.method === 'POST' && authentication.username === 'huyhoang' && authentication.password === '1512180') // kiem chung ten dang nhap va mat khau
        {
          var hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // cap key ngau nhien
          key.push(hash)
          send_suscess_res(hash, 'text/plain', res)
        }
        else {
          send_fail_res(res)
        }
        break
      case '/data':
        if (req.method === 'GET' && key.find(function(obj) { return obj === body}) != null) // neu da dang nhap
        {
          send_suscess_res(JSON.stringify(
            {
              products: products_arr,
              users: users_arr,
              bills: bills_arr
            }), 'text/json', res)
        }
        else {
          send_fail_res(res)
        }
        break
    }
  });
}).listen(3000)