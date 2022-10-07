
let addToBasketBooks = [];
let basketBooks = [];

function BookLogic(clickBookObject,totalBooks){
    let Root = document.querySelector('.root');
    Root.querySelector('.book-details-con').innerHTML =
    `
    <div class="book-details">
        <div class="img-con">
            <img src="${clickBookObject.cover}" alt="Cover not found">
        </div>
        <div class="info">
            <h3>Title</h3>
            <p>${clickBookObject.title}</p>
            <h3>Author</h3>
            <p>${clickBookObject.author}</p>
        </div>  
    </div>
    <button class="add-to-basket">Add to basket</button>
    `
    let addToBasketBtn = Root.querySelector('.add-to-basket');
    addToBasketBtn.addEventListener('click',()=>{
        addToBasketBooks.push(clickBookObject);
        totalBooks.textContent = `${addToBasketBooks.length} item(s)`;
        filterBook();
    });

    function filterBook(){
        if(basketBooks.length === 0){
            checkBasBooksEmpty(clickBookObject);
        }
        else if(basketBooks.length > 0){
            increaseQuantity();
        }
    };
    
    function checkBasBooksEmpty(itm){
        basketBooks.push({
            id: itm.id,
            pay:{
                title: itm.title,
                quantity: 1
            }
        })
    }
    function increaseQuantity(){
        basketBooks.forEach(i =>{
            if(i.id === clickBookObject.id){
                i.pay.quantity++;
            }
            else if(findObjectInArr(basketBooks,clickBookObject.id) === -1){
                basketBooks.push({
                    id: clickBookObject.id,
                    pay:{
                        title: clickBookObject.title,
                        quantity: 1
                    }
                })
            }
        })
        // console.log(basketBooks);
    }

    function findObjectInArr(arr,id){
        const index = arr.findIndex((itm,index)=>  itm.id === id)
        return index;
    }

}


export {BookLogic,addToBasketBooks,basketBooks}