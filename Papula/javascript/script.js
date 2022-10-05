const flowers = JSON.parse(flowersJSON);
// console.log(flowers)

const currencyFormater = new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
});

for(flower of flowers){
    document.getElementById("d_container").innerHTML += `    
    <div class="card" id="d_card" style="width: 18rem;">
    <img src="./images/${flower.image}" class="card-img-top" alt="${flower.name}">
    <div class="card-body">
      <h5 class="card-title">${flower.name}</h5>
      <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, atque.</p>
      <p class="card-text d-flex justify-content-end">${currencyFormater.format(flower.price)}</p>
      <p class="card-text d-flex justify-content-end"><button class="btn w-75 text-white bg-dark add_btn"> Add to cart</button></p>      
    </div>
  </div>`;
}



const cart = [];

const addToCartBtn = document.querySelectorAll(".add_btn");

addToCartBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      addToCart(flowers[i]);
    });
  });

const addToCart = (flower) => {
    if (cart.find((val) => val.name == flower.name)) {
        // console.log(cart.find((val) => val.name == product.name));
        flower.qtty++;
    } else {
        cart.push(flower);
    }
    // console.table(cart);
    createRows();
    cartTotal();
};

const plusQtty = (index) => {
    cart[index].qtty++;
    createRows();
    cartTotal();
};

const minusQtty = (index) => {
    if (cart[index].qtty == 1) {
      cart.splice(index, 1);
    } else {
      cart[index].qtty--;
    }
    createRows();
    cartTotal();
};

const deleteItem = (index) => {
    cart[index].qtty = 1;
    cart.splice(index, 1);
    createRows();
    cartTotal();
};

const createRows = () => {
    let result = "";
    for (let item of cart) {
        result += `
        <div class="cart-row row gx-0">
            <div class="cart-item col-6 ps-md-5 my-2 d-flex align-items-center justify-content-start">
                <img class="cart-item-image" id="d_card" src="./images/${item.image}" width="130" height="100" alt="${item.name}">
                <div class="cart-item-title h5 ms-2">${item.name}</div>
            </div>
            <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                <div class="d-flex">
                    <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                </div>
                <div class="text-center m-0 cart-quantity h4 w-25">${item.qtty}</div>
                <div class="d-flex">
                    <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                </div>
            </div>
            <div class="col-1 d-flex justify-content-start align-items-center">
                <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
            </div>
            <div class="cart-price col-3 h5 my-auto text-end p-2 pe-sm-5">${currencyFormater.format(item.price)}</div>                    
        </div>`;
    }
    document.querySelector(".c_items").innerHTML = result;
    const plusBtns = document.querySelectorAll(".plus");
    const minusBtns = document.querySelectorAll(".minus");
    const deleteBtns = document.querySelectorAll(".del");
    //   console.log(plusBtns);
    plusBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            plusQtty(i);
        });
    });
    minusBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            minusQtty(i);
        });
    });
    deleteBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            deleteItem(i);
        });
    });
};

const cartTotal = () => {
    let total = 0;
    for (let item of cart) {
      total += item.price * item.qtty;
    }    
    document.getElementById("price").innerHTML = currencyFormater.format(total);
};