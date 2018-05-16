function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open('GET', 'http://localhost:3001', true);
    xhttp.send();
}
function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName('product'); // lay danh sach san pham
    var n = parseInt(x.length / 4 + 1); // tinh so luong trang
    for (var i = 0; i < n; i++) {
        // tao the li
        var li = document.createElement('li');
        document.getElementById('hot').appendChild(li);
        // tao the row
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        li.appendChild(row);
        ///////////////////////////////////////////////
        for (var j = 0; j < 4; j++) {
            if (i*4 + j == xmlDoc.getElementsByTagName('product').length) {
                break;
            }
            // tao the col trong the row
            var col = document.createElement('div');
            col.setAttribute('class', 'col-md-3 col-sm-6');
            row.appendChild(col);
            // tao the product trong the col
            var product = document.createElement('div');
            product.setAttribute('class', 'products');
            col.appendChild(product);
            // tao the offer  trong the product
            var y = x[i*4 + j].getAttribute('offer');
            if (y != null) {
                var offer = document.createElement('div');
                offer.setAttribute('class', 'offer');
                offer.innerHTML = '-' + parseFloat(y)*100 + '%';
                product.appendChild(offer);
            }
            // tao the thumbnail trong the product
            var thumbnail = document.createElement('div');
            thumbnail.setAttribute('class', 'thumbnail');
            product.appendChild(thumbnail);
            // tao the a trong thumbnail
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            thumbnail.appendChild(a);
            // tao the img trong the a
            var img = document.createElement('img');
            img.setAttribute('src', './images/products/small/' + x[i*4 + j].getAttribute('productid') + '.png');
            img.setAttribute('alt', x[i*4 + j].getAttribute('productname'))
            a.appendChild(img);
            // tao the productname trong the product
            var productname = document.createElement('div');
            productname.setAttribute('class', 'productname');
            productname.innerHTML = x[i*4 + j].getAttribute('productname');
            product.appendChild(productname);
            // tao the price trong the product
            var price = document.createElement('h4');
            price.setAttribute('class', 'price');
            var z = x[i*4 + j].getAttribute('unitprice');
            if (y != null) {
                price.innerHTML = '$' + parseInt(z) * (1 - parseFloat(y));
            }
            else {
                price.innerHTML = '$' + z;
            }
            product.appendChild(price);
        }
    }
}