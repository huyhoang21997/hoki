function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
    };
    xhttp.open('GET', 'http://localhost:3001/data/products', true);
    xhttp.send();
}
function myFunction(res) {
    var obj = JSON.parse(res.response);
    var n = parseInt(obj.length/4 + 1);//tinh so luong trang
    for(var i = 0; i < n; i++) {
        // tao the li
        var li = document.createElement('li');
        document.getElementById('hot').appendChild(li);
        // tao the row
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        li.appendChild(row);
        ///////////////////////////////////////////////
        for (var j = 0; j < 4; j++) {
            if (i*4 + j == obj.length) {
                break;
            }
            // tao the col trong the row
            var col = document.createElement('div');
            col.setAttribute('class', 'col-md-3 col-sm-3');
            row.appendChild(col);
            // tao the product trong the col
            var product = document.createElement('div');
            product.setAttribute('class', 'products');
            col.appendChild(product);
            // tao the a trong the product
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            product.appendChild(a);
            // tao the offer trong the a
            var y = obj[i*4 + j].other;
            if (y != null) {
                var offer = document.createElement('div');
                offer.setAttribute('class', 'offer');
                offer.innerHTML = '-' + parseFloat(y)*100 + '%';
                a.appendChild(offer);
            }
            // tao the thumbnail trong the a
            var thumbnail = document.createElement('div');
            thumbnail.setAttribute('class', 'thumbnail');
            a.appendChild(thumbnail);
            // tao the img trong the thumbnail
            var img = document.createElement('img');
            img.setAttribute('src', './images/' + obj[i*4 + j].productId + '_1.jpg');
            img.setAttribute('alt', obj[i*4 + j].productName)
            thumbnail.appendChild(img);
            // tao the productName trong the a
            var productName = document.createElement('div');
            productName.setAttribute('class', 'productname');
            productName.innerHTML = obj[i*4 + j].productName;
            a.appendChild(productName);
            // tao the price trong the a
            var price = document.createElement('h4');
            price.setAttribute('class', 'price');
            var z = obj[i*4 + j].unitPrice;
            if (y != null) {
                price.innerHTML = '$ ' + parseInt(z) * (1 - parseFloat(y));
            }
            else {
                price.innerHTML = '$ ' + z;
            }
            a.appendChild(price);
        }
    }
}