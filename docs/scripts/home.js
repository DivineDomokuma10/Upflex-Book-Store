
export default class Home{
    constructor(){
        this.selectedBook = '';
        this.bookShelfArr = [];
    }

    HomeLogic = async()=>{
        let fetchData = await fetch('https://upflex-book-store-api.herokuapp.com/books');
        let data = await fetchData.json();
    
        data.forEach( i => {
            document.querySelector('.book-shelf').innerHTML += 
            ` <div class="shelf-book">
                <a href="/upflex-book-store/book" onclick="router()">${i.title}</a>
                <p>${i.metaDescription}</p>
            </div>`
            this.bookShelfArr.push(i);
        });
    
        let shelfBooks = document.querySelectorAll('.shelf-book');
        Array.from(shelfBooks).forEach(book => {
            book.addEventListener('click',e =>{
                this.bookShelfArr.forEach(i =>{
                    if(e.target.textContent === i.title){
                       this.selectedBook = i;
                    }
                })
            })
        });
    
    
    }
}
