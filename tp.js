import items from "./data.js"
let sos = document.querySelector(".cards")
for (const p of items) {
    let index = items.indexOf(p)
    sos.innerHTML += `
    <div class="dess-card col-4">
                    <div class="image">
                        <img id = "pc" class="w-100" src="${p.image.desktop}" alt="">
                        <img id="mobail" class="w-100" src="${p.image.mobile}" alt="">
                        <img id="tablet" class="w-100" data-img = "${index}" src="${p.image.thumbnail}" alt="">
                        <div class="add-cart" data-index="${index}" data-number="${index}">
                            <button class="add"> <img src="assets/images/icon-add-to-cart.svg" alt=""> <p class="title">Add to Cart</p> </button>
                        </div>
                        <div class="quantity" data-index="${index}" data-number="${index}">
                            <i id="minus" class="fa fa-minus"></i>
                            <input type="number" name="" id="quantity-number" value="1" max="1000">
                            <i id="plus" class="fa fa-plus"></i>
                        </div>
                    </div>
                    <div class="desc">
                        <p class="desc-0">${p.name}</p>
                        <p class="desc-2">${p.category}</p>
                        <span>$<span class="desc-3">${p.price}</span></span>
                    </div>
                </div>
    `
}


const credit = document.querySelectorAll(".add-cart")
const quantity = document.querySelectorAll(".quantity")
const plusBtn = document.querySelectorAll("#plus")
const minusBtn = document.querySelectorAll("#minus")
const numberSpan = document.querySelectorAll("#quantity-number")
const cartNumber = document.getElementById("cart-quantiy");
const imageCader = document.querySelectorAll(".image")
const walletImage = document.getElementById("empty-cart")
const walletText = document.querySelector(".text")
const walletDiv = document.getElementById("wallet-contonu")
const walletDelivery = document.querySelector(".delivery")
const total = document.querySelector(".total")
const totalNumber = document.querySelector(".total-number")
const buttonConfirm = document.querySelector(".confirm")
const tablOrder = document.querySelector(".confirm-order")
const all = document.querySelector(".all")
const orderContonu = document.querySelector(".order-contonu")
const orderNumber = document.querySelector(".order-number")
const thumbnails = document.querySelectorAll('.tablet');
const images = {
    0: './assets/images/image-waffle-thumbnail.jpg',
    1: './assets/images/image-creme-brulee-thumbnail.jpg',
    2: './assets/images/image-macaron-thumbnail.jpg',
    3: './assets/images/image-tiramisu-thumbnail.jpg',
    4: './assets/images/image-baklava-thumbnail.jpg',
    5: './assets/images/image-meringue-thumbnail.jpg',
    6: './assets/images/image-cake-thumbnail.jpg',
    7: './assets/images/image-brownie-thumbnail.jpg',
    8: './assets/images/image-panna-cotta-thumbnail.jpg',
};
thumbnails.forEach(img => {
    const name = img.getAttribute('data-img');
    const src = img.getAttribute('src');
    images[name] = src;
});


let walletTitle = Array.from(document.querySelectorAll(".desc-2")).map(wt =>
    wt.textContent
);
let walletPrice = Array.from(document.querySelectorAll(".desc-3")).map(wp =>
    wp.textContent
);



credit.forEach(function (cart, index) {
    cart.addEventListener("click", () => {
        cart.setAttribute("data-img", index)
        let dataImg = index

        cart.setAttribute("data-index", index);
        let dataindex = index;

        cart.setAttribute("data-number", index)
        let dataNumber = index

        if (cart.style.display === "" || cart.style.display === "block") {
            cart.style.display = "none";
            quantity[index].style.display = "block";
            imageCader[index].style.border = "2px solid #c73a0f";
            numberSpan[index].value = 1;
            walletImage.style.display = "none";
            walletText.style.display = "none";
            walletDiv.style.display = "block";
            walletDelivery.style.display = "flex"
            walletDelivery.style.gap = "10px"
            total.style.display = "block"
            buttonConfirm.style.display = "block"

        }
        cartNumber.stepUp(1)

        // code pour wallet 


        const Contonu = document.createElement("div");
        Contonu.classList.add("div-js");
        // Replace `imageIndex` with `dataImg` because you are passing dataImg to the function.
        Contonu.innerHTML = `
        <img data-img="${dataImg}" class="img" src="${images[dataImg]}" >
        <div class="div-mm">
            <strong>${walletTitle[index]}</strong> <br>
            <span class="quantity-span" data-index="${dataindex}">${parseInt(numberSpan[index].value)}x</span>
            <span class="pric-span">@  $${parseFloat(walletPrice[index]).toFixed(2)}</span>
            <span class="opiration" data-number="${dataNumber}">  $${(parseInt(numberSpan[index].value) * parseFloat(walletPrice[index])).toFixed(2)}</span> 
            <i id="remove" class=" fa fa-remove"></i>
            <span class="total"> order total </span>
        </div>
        `;


        walletDiv.appendChild(Contonu);
        Contonu.querySelector("#remove").addEventListener("click", () => {
            Contonu.remove();
            const q = parseInt(numberSpan[dataindex].value)
            cartNumber.value = parseInt(cartNumber.value) - q;
            numberSpan[dataindex].value = 1;
            if (numberSpan[dataindex].value = 1){
                cart.style.display = "block"
                quantity[index].style.display = "none"
                imageCader[index].style.border = "transparent";
            }
            if (walletDiv.textContent === "") {
                walletImage.style.display = "block";
                walletText.style.display = "block";
                walletDiv.style.display = "none"
                walletDelivery.style.display = "none"
                total.style.display = "none"
                buttonConfirm.style.display = "none"
            }
            if ( minusBtn === 1){
                cart.style.display = "block"
                quantity[dataindex].style.display = "none"
            }
            totaleOrder()
        });
        totaleOrder()
    });

});
// ----------------------------------------------------------------------------------


buttonConfirm.addEventListener("click", () => {
    tablOrder.style.display = "block";
    all.style.visibility = "visible";
    const wallet = walletDiv.querySelectorAll(".div-js");
    wallet.forEach(back => {
        const imageList = back.querySelector(".img")
        const imageIndex = imageList.getAttribute("data-img")
        const title = back.querySelector("strong").textContent;
        const quantitySpan = back.querySelector(".quantity-span");
        

        const quantity = quantitySpan.textContent;
        const dataIndex = quantitySpan.getAttribute("data-index");
        const priceSpan = back.querySelector(".pric-span").textContent;
        const opiration = back.querySelector(".opiration");
        const operation2 = opiration.textContent
        const dataNumber = opiration.getAttribute("data-number")
        const confirmTable = document.createElement("div");
        confirmTable.classList.add("confirmTable");
        confirmTable.innerHTML = `
            <img data-img = "${imageIndex}" class = "img-order" src="${images[imageIndex]}" >
            <div class = "vool">
                <strong class = "title-orer">${title}</strong> <br>
                <span class="quantity-order" data-index="${dataIndex}">${quantity}</span>
                <span class="pric-oredr">${priceSpan}</span>
                <span class="opira" data-number="${dataNumber}">${operation2}</span>              
            </div>
        `;

        orderContonu.appendChild(confirmTable);
        
    });
    totaleOrdere2()
});

// ----------------------------------------------------------------------------------


function totaleOrdere2(){
    let totalee = 0;
    const opiration = document.querySelectorAll(".opira")
    opiration.forEach((ope) =>{
        totalee += parseFloat(ope.textContent.replace(/[^\d.]/g, ""));        
    })
    orderNumber.textContent = `$${totalee.toFixed(2)}`
}


function totaleOrder(){
    let totale = 0;
    const opiration = document.querySelectorAll(".opiration")
    opiration.forEach((op) =>{
        totale += parseFloat(op.textContent.replace(/[^\d.]/g, ""));        
    })
    totalNumber.textContent = `$${totale.toFixed(2)}`
}


plusBtn.forEach((plus, sp) => {
    plus.addEventListener("click", () => {
        cartNumber.stepUp(1)
        numberSpan[sp].stepUp(1)
        // code pour wallet
        let myAttribut = plus.parentElement.setAttribute("data-index", sp);
        myAttribut = plus.parentElement.getAttribute("data-index");
        const quantitySpan = walletDiv.querySelector(`.quantity-span[data-index="${myAttribut}"]`);
        quantitySpan.textContent = `${numberSpan[sp].value}x`;

        let dataNumber = plus.parentElement.setAttribute("data-number", sp)
        dataNumber = plus.parentElement.getAttribute("data-number")
        const operation = walletDiv.querySelector(`.opiration[data-number="${dataNumber}"]`)
        operation.textContent = `@  $${(parseInt(numberSpan[sp].value) * parseFloat(walletPrice[sp])).toFixed(2)}`
        totaleOrder()
    });
})


minusBtn.forEach((minus, sl) => {
    minus.addEventListener("click", () => {
        
        let dataNumber = minus.parentElement.getAttribute("data-number")
        cartNumber.stepDown(1);
        const myAttribut = minus.parentElement.getAttribute("data-index");
        const operation = walletDiv.querySelector(`.opiration[data-number="${dataNumber}"]`)
        let ns = minus.nextElementSibling
        const s = parseInt(ns.value);
        const c = parseInt(cartNumber.value)
        const quantitySpan = walletDiv.querySelector(`.quantity-span[data-index="${myAttribut}"]`);
        if (s > 1) {

            ns.stepDown(1);
            // code pour wallet
            quantitySpan.textContent = `${ns.value}x`;
            operation.textContent = `@  $${(parseInt(ns.value) * parseFloat(walletPrice[sl])).toFixed(2)}`

        }
        if (s === 1) {
            quantity[sl].style.display = "none";
            credit[sl].style.display = "block";
            imageCader[sl].style.border = "transparent";
            quantitySpan.parentElement.parentElement.remove()

        }
        if (walletDiv.textContent === "") {
            walletImage.style.display = "block";
            walletText.style.display = "block";
            walletDiv.style.display = "none"
            walletDelivery.style.display = "none";
            total.style.display = "none"
            buttonConfirm.style.display = "none"
        }
        totaleOrder()
    });
});
document.addEventListener("DOMContentLoaded", () =>{
    var restartButton = document.querySelector(".order-button")
    restartButton.addEventListener("click", () =>{
        location.reload()
    })
    
})