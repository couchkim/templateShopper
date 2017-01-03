// let items = [
//     {   title: 'Book A',
//         author: 'Person 1',
//         price: 100.00,
//         cover: 'http://something.jpeg',
//     },

//     {   title: 'Book B',
//         author: 'Person 2',
//         price: 21.00,
//         cover: 'http://something.jpeg',
//     },

//     {   title: 'Book C',
//         author: 'Person 3',
//         price: 35.00,
//         cover: 'http://something.jpeg',
//     },
// ];

let cart = [];

window.addEventListener('load', function (){
    console.log('here we go');
    getProducts();

    // for (let i = 0; i < items.length; i ++) {
    //     showProduct(items[i]);
    // }
    
});

function getProducts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://api.queencityiron.com/books');
    request.addEventListener('load', function () {
        let response = JSON.parse(request.responseText);
        let books = response.books;
        for (let i = 0; i < books.length; i ++) {
        showProduct(books[i]);
    }
    });

    request.send();
};

function showProduct(product){
    let child = document.createElement('li');
    let parent = document.querySelector('#products ul');
    
    let template = document.querySelector('#product-template');

    child.innerHTML = Mustache.render(template.innerHTML, {
        bookName: product.title,
        authorName: product.author,
        price: product.price.toFixed(2),
    });  

// Can't put let button above because child hasn't been created.
// can find button in child element (li) that we just created.

    let button = child.querySelector('button');
    button.addEventListener('click', function (){
        console.log('clicked on ' + product.title);
        cart.push(product);
        showCart();
        // console.log(cart);
    });

    parent.appendChild(child);

}

function showCart(){
    let cartList = document.querySelector('#cart ul');
    cartList.innerHTML = '';

// clear all items    // 
    
    for (let i = 0; i < cart.length; i ++){
        showCartItem(cart[i]);
    }

    let subtotal = 0;
    for (i = 0; i < cart.length; i++){
        subtotal = subtotal + cart[i].price;
    }

    document.querySelector('#cart-subtotal').textContent = displayPrice(subtotal);
    document.querySelector('#cart-tax').textContent = displayPrice(subtotal * .1);
    document.querySelector('#cart-total').textContent = displayPrice(subtotal + (subtotal * .1));
}

function showCartItem(item){
    let child = document.createElement('li');
    let parent = document.querySelector('#cart ul');
    
    let template = document.querySelector('#cart-template');

    child.innerHTML = Mustache.render(template.innerHTML, {
        bookName: item.title,
        price: item.price.toFixed(2),
    });   

    parent.appendChild(child);   
 }

function displayPrice(num){
    return (Math.round(num*100))/100;
    
}