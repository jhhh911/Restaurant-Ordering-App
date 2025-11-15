import { menuArray } from "./data.js";

const orderArray = [];

const footer = document.querySelector(".footer");
const itemContainer = document.querySelector(".order-container");
const totalPrice = document.getElementById("price");

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    openOrderSummary(e.target.dataset.add);
  } else if (e.target.classList.contains("remove-btn")) {
    handleRemove(e.target);
  }
});

function renderItems() {
  return menuArray
    .map(item => {
      const { name, ingredients, id, price, emoji } = item;
      return `
    <section class="item-container">
      <div class='content'>
        <div class="emoji" aria-label='${name}'>${emoji}</div>
          <div class="text">
            <h3 class='name'>${name}</h3>
            <p class='ingredients'>${ingredients}</p>
            <p class="bold">$${price}</p>
          </div>
        </div>
        <button class="order-btn" data-add='${id}'>+</button>
      </section>
      <div class='border-bottom'></div>
    `;
    })
    .join("");
}

document.getElementById("main").innerHTML = renderItems();

const priceArray = [];

function openOrderSummary(orderId) {
  let order = "";
  menuArray.forEach(item => {
    if (item.id === Number(orderId)) {
      orderArray.push(item);
      priceArray.push(item.price);
      if (!footer.classList.contains("footer-active")) {
        footer.classList.add("footer-active");
      }
      order += `
    <div class="item-content">
    <div class="item">
      <h3>${item.name}</h3>
      <button class="remove-btn" data-remove="${item.id}">remove</button>
    </div>
    <p class="bold price">$${item.price}</p>
  </div>
  `;

      itemContainer.innerHTML += order
    }
  });

  let value = priceArray.reduce((acc, cur) => acc + cur, 0);
  totalPrice.innerHTML = `$${value}`;
}

function handleRemove(buttonEl) {
  // var to find the id of deleted item
  const orderId = Number(buttonEl.dataset.remove)
  // find the index of the order in the Order array
  const index = orderArray.findIndex(item => item.id === orderId)
  if (index !== -1) {
    orderArray.splice(index, 1)
    priceArray.splice(index, 1)
  }
  if(orderArray.length === 0) {
    footer.classList.remove('footer-active')
  }
}
