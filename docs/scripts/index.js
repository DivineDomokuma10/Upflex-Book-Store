import Home from "./home.js";
import * as bookStuff from "./book.js";
import * as basketStuff from "./basket.js";

console.log('Courtesy By Divine Domokuma');
let root =  document.querySelector('.root');
let totalAddedBooks = document.querySelector('.items')

const router = event =>{
    event = window.event || event;
    event.preventDefault();
    history.pushState({}," ",event.target.href);
    renderHtml()
}

const routes = {
    '/upflex-book-store': '/upflex-book-store/home.html',
    '/upflex-book-store/book': '/upflex-book-store/book.html',
    '/upflex-book-store/basket': '/upflex-book-store/basket.html'
}

const renderHtml = async () =>{
    let path = window.location.pathname;
    let route = routes[path] || routes['/upflex-book-store'];
    let fetchHtml = await fetch(route);
    let html = await fetchHtml.text();
    document.querySelector('.root').innerHTML = html;
    checkPageLogic();
    setTitle();
}

let homeStuff = new Home();

const checkPageLogic = ()=>{

    let path = window.location.pathname;
    if(path === '/upflex-book-store' || path === '/upflex-book-store/index.html'){
        homeStuff.HomeLogic();
    }
    else if(path === '/upflex-book-store/book'){
        bookStuff.BookLogic(homeStuff.selectedBook,totalAddedBooks);
    }
    else if(path === '/upflex-book-store/basket'){
        basketStuff.renderBasketBook(bookStuff.addToBasketBooks,bookStuff.basketBooks);
    }
}

function setTitle(){
    document.title = root.querySelector('title').textContent;
}

window.onpopstate = renderHtml;
window.router = router;
renderHtml();