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
    './docs/': './docs/home.html',
    './docs/book': './docs/book.html',
    './docs/basket': './docs/basket.html'
}

const renderHtml = async () =>{
    let path = window.location.pathname;
    let route = routes[path] || routes['./docs/'];
    let fetchHtml = await fetch(route);
    let html = await fetchHtml.text();
    document.querySelector('.root').innerHTML = html;
    checkPageLogic();
    setTitle();
}

let homeStuff = new Home();

const checkPageLogic = ()=>{

    let path = window.location.pathname;
    if(path === './docs/' || path === './docs/index.html'){
        homeStuff.HomeLogic();
    }
    else if(path === './docs/book'){
        bookStuff.BookLogic(homeStuff.selectedBook,totalAddedBooks);
    }
    else if(path === './docs/basket'){
        basketStuff.renderBasketBook(bookStuff.addToBasketBooks,bookStuff.basketBooks);
    }
}

function setTitle(){
    document.title = root.querySelector('title').textContent;
}

window.onpopstate = renderHtml;
window.router = router;
renderHtml();