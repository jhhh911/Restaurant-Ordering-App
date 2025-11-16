import { menuArray } from "./data.js";

const orderContainer = document.getElementById("order-container");
const orderList = document.getElementById("order");

let orderArray = [];

// Render Menu
const menuHTML = menuArray
  .map(({ name, ingredients, id, price, emoji }) => {
    return `
      <div class="menu-item">
        <div class='menu-content'>
          <p class="emoji" aria-label='${name}'>${emoji}</p>
          <div class="menu-text">
            <p class='item-name'>${name}</p>
            <p class='item-ingredients'>${ingredients}</p>
            <p class="item-price">$${price}</p>
          </div>
        </div>
        <button class="add-btn" data-add='${id}'>+</button>
      </div>
    `;
  })
  .join("");

document.getElementById("menu-container").innerHTML = menuHTML;

document.addEventListener("click", e => {
  if (e.target.dataset.add) {
    addItemToOrder(e.target.dataset.add);
  } else if (e.target.dataset.delete) {
    deleteItemFromOrder(e.target.dataset.delete);
  }
});

// add item to order

function addItemToOrder(itemId) {
  const matchingItem = menuArray.find(item => item.id === Number(itemId));
  const existingItem = orderArray.find(item => item.id === Number(itemId));
  if (!existingItem) {
    matchingItem.quantity = 1;
    orderArray.push(matchingItem);
    renderOrderItem(matchingItem);
  } else {
    existingItem.quantity++;
    updateOrderItem(matchingItem);
  }
  renderOrderData();
  calculateOrderTotal();
}

// render individual order item
function renderOrderItem(item) {
  orderList.innerHTML += `
    <div class='order-items' id='order-${item.id}'>
      <div class='order-items-text'>
        <p class='order-item-title'>${item.name}</p>
        <p class='order-item-quantity' id='order-quantity-${item.id}'>x ${item.quantity}</p>
        <i class='fa-solid fa-trash' data-delete='${item.id}'></i>
      </div>
      <p class="order-item-price" id='order-price-${item.id}'>$${item.price}</p>
    </div>
  `;
}

// Update item quantity & price in DOM

function updateOrderItem(item) {
  document.getElementById(
    `order-quantity-${item.id}`
  ).innerHTML = `x ${item.quantity}`;
  document.getElementById(`order-price-${item.id}`).innerHTML = `$${
    item.price * item.quantity
  }`;
}

// Delete item from order
function deleteItemFromOrder(itemId) {
  const item = orderArray.find(i => i.id === Number(itemId));

if (!item) return;

  if (item.quantity > 1) {
    item.quantity--
    updateOrderItem(item)
  } else {
    const index = orderArray.indexOf(item)
    orderArray.splice(index, 1);

    const orderEl = document.getElementById(`order-${item.id}`);
    if (orderEl) orderEl.remove();
  }

  renderOrderData()
  calculateOrderTotal()
}

// calculate total price
function calculateOrderTotal() {
  const total = orderArray.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  document.getElementById('total').innerHTML = `$${total}`;
}

//show/hide order container
function renderOrderData() {
  orderContainer.style.display = orderArray.length > 0 ? "block" : "none";
}

// bring up the pay form & message
