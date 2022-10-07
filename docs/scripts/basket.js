
let Pay = [];

function renderBasketBook(totalAddedBooks,bookArr){
    let section = document.querySelector('section');
    let basketInfo = document.querySelector('h2');
    let booksCount = document.querySelector('.items');
    let payBtn = document.querySelector('.pay');
    payBtn.onclick = pay;
    
    function showpayBaskDetail(){
        if(section.childElementCount === 0){
            basketInfo.textContent = 'Basket Empty';
            payBtn.style.display = 'none';
        }
        else if(section.childElementCount > 0){ 
            basketInfo.textContent = 'Basket Summary';
            payBtn.style.display = 'inline';  
            
        }
    }

    function reduceTotal(totalArr,itm){
        let index = totalArr.findIndex((i,index)=> i.id === itm.id);
        totalArr.splice(index,1);
        booksCount.textContent = `${totalArr.length} item(s)`;
    }

    function pay(){
        Pay = []
        setTimeout(()=>{
            bookArr.forEach(i => Pay.push({id:i.id, quantity: i.pay.quantity}))
        },10)
        console.log(Pay)
    }


    function renderBookHtml(){
        bookArr.forEach(e => {
            section.innerHTML += 
            `
            <div class="book-con">
                <div class="book-main-con"><h1 class="book-title">${e.pay.title}</h1></div>
                <div class="quantity-removebtn-con">
                    <h3>X ${e.pay.quantity}</h3>
                    <button class="remove" id="${e.id}">Remove</button>
                </div>
            </div>
            `
        });

        let clickToRemove = document.getElementsByClassName('quantity-removebtn-con');
        for(let i = 0; i < clickToRemove.length; i++){
            clickToRemove[i].addEventListener('click',removeBook);
        }
    
        function removeBook(e){
            let checker = e.target.previousElementSibling.textContent[2];

            if(parseInt(checker) !== 1){
                reduceQun(bookArr,e.target.id,e.target);
            }
            else if(parseInt(checker) === 1){
                removeFromArr(bookArr,e.target.id,e.target)
            };
            showpayBaskDetail();
            reduceTotal(totalAddedBooks,e.target.id)

        }

        function reduceQun(arr,id,rmvBtn){
            const index = arr.findIndex((itm,index)=> itm.id===parseInt(id) && itm.pay.quantity !== 1);
            arr[index].pay.quantity--;
            rmvBtn.parentElement.firstElementChild.textContent = `X ${arr[index].pay.quantity}`;
        }
    
        function removeFromArr(arr,id,rmvBtn){
            const index = arr.findIndex((itm, index) => itm.id === parseInt(id) && itm.pay.quantity === 1);
            arr.splice(index,1);
            rmvBtn.parentElement.parentElement.remove();
        }
        showpayBaskDetail();
    };


    renderBookHtml();
}


export {renderBasketBook,Pay}