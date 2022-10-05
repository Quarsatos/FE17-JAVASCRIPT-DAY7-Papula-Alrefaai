const products = [
  {
    name: "Red Flowwer",
    image: "flower1.png",
    price: 43.99,
    qtty: 1,
  },
  {
    name: "One Flower",
    image: "flower2.png",
    price: 5,
    qtty: 1,
  },
  {
    name: "Red and wihte Flowers",
    image: "flower3.png",
    price: 55.0,
    qtty: 1,
  },
  {
    name: "Red Flowwer",
    image: "flower4.png",
    price: 43.99,
    qtty: 1,
  },
  {
    name: "One Flower",
    image: "flower5.png",
    price: 5,
    qtty: 1,
  },
  {
    name: "Red and wihte Flowers",
    image: "flower6.png",
    price: 55.0,
    qtty: 1,
  },
  {
    name: "Red Flowwer",
    image: "flower7.png",
    price: 43.99,
    qtty: 1,
  },
  {
    name: "One Flower",
    image: "flower8.png",
    price: 5,
    qtty: 1,
  },
  {
    name: "Red and wihte Flowers",
    image: "flower9.png",
    price: 55.0,
    qtty: 1,
  }, 
  {
    name: "Red Flowwer",
    image: "flower5.png",
    price: 43.99,
    qtty: 1,
  },
  {
    name: "One Flower",
    image: "flower4.png",
    price: 5,
    qtty: 1,
  },
  {
    name: "Red and wihte Flowers",
    image: "flower10.png",
    price: 55.0,
    qtty: 1,
  },
];
//current object formatter
const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

//select the products row and add items dynamically
let productsRow = document.querySelector(".products");

for (let product of products) {
  productsRow.innerHTML += `
  <div class="card product col my-4" style="width: 300px;">
                <img class="card-img-top mt-2 px-3" src="./images/${
                  product.image
                }" alt="${product.name}">
                <div class="card-body px-3 py-0">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, libero.</p>
                    <p class="card-text h3 text-end">${currencyFormater.format(
                      product.price
                    )}</p>
                    <p class="card-text3 d-flex justify-content-end"><button class="btn w-75 product-button"><i class="fs-4 bi bi-cart-plus"></i> Add to cart</button></p>

                </div>
            </div>
    `;
}

//cart declared
const cart = [];

//product button selected
const addToCartBtn = document.querySelectorAll(".product-button");

//add event to add to cart buttons
addToCartBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    addToCart(products[i]);
  });
});

//adds product to cart
const addToCart = (product) => {
  if (cart.find((val) => val.name == product.name)) {
    // console.log(cart.find((val) => val.name == product.name));
    product.qtty++;
  } else {
    cart.push(product);
  }
 // console.table(cart);
  createRows();
  cartTotal();
  cartTotal1();
};

//increases item quantity
const plusQtty = (index) => {
  cart[index].qtty++;
  createRows();
  cartTotal();
  cartTotal1();

};
//decreases item quantity
const minusQtty = (index) => {
  if (cart[index].qtty == 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qtty--;
  }
  createRows();
  cartTotal();
  cartTotal1();

};

//deletes item from cart
const deleteItem = (index) => {
  cart[index].qtty = 1;
  cart.splice(index, 1);
  createRows();
  cartTotal();
  cartTotal1();

};
//creates row in cart - dom
const createRows = () => {
  let result = "";
  for (let item of cart) {
    result += `
    <div class="cart-row row gx-0">
    <div class="cart-item col-6 ps-md-5 my-2 d-flex align-items-center justify-content-start">
                        <img class="cart-item-image" src="./images/${
                          item.image
                        }" width="100" height="100" alt="${item.name}">
                        <div class="cart-item-title h5 ms-2">${item.name}</div>
                    </div>
                    <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                        <div class="d-flex">
                            <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                        </div>
                        <div class="text-center m-0 cart-quantity h4 w-25">${
                          item.qtty
                        }</div>
                        <div class="d-flex">
                            <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                        </div>
                    </div>
                    <div class="col-1 d-flex justify-content-start align-items-center">
                    <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
                    </div>
                    <div class="cart-price col-3 h5 my-auto text-end p-2 pe-sm-5">${currencyFormater.format(
                      item.price
                    )}</div>
                </div>                    
                </div>
        `;
  }
  document.querySelector(".cart-items").innerHTML = result;
  const plusBtns = document.querySelectorAll(".plus");
  const minusBtns = document.querySelectorAll(".minus");
  const deleteBtns = document.querySelectorAll(".del");
  const amountBtn = document.querySelectorAll("#btn-purchase");
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

//updates the cart total amount
const cartTotal = () => {
  let total = 0;
  for (let item of cart) {
    total += item.price * item.qtty;
  }
  document.getElementById("price").innerHTML = currencyFormater.format(total);
  //console.log(total);
};

const cartTotal1 = () => {
  let total1 = 0;
  let total = 0;
  let totals = 0;
  let endP = 0;
  let totalo = 0;
  let dis = 0;



  for (let item of cart) {
    dis += item.price;
    total1 += item.qtty;
    total += dis*total1;
    if (total >= 10) {
      total = (dis * total1);
      totalo = (total * 10);
      totals = (totalo / 100);
      endP = (total - totals);
      document.getElementById("price1").innerHTML = currencyFormater.format(endP);
      console.log(endP);
    }
  }
  document.getElementById("price1").innerHTML = (endP);
  //console.log(endP);

  document.getElementById("amount").innerHTML = (total1);
 // console.log(total1);
};


