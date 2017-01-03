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

    parent.appendChild(child);

}