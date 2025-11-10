import { menuArray } from "./data.js";

const orderArray = [];

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

const footer = document.querySelector(".footer");
const itemContainer = document.querySelector('.order-title')

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    openOrderSummary(e.target.dataset.add);
    
  }
});

function openOrderSummary(orderId) {
  let order = ''
  menuArray.forEach(item => {
    if(item.id === Number(orderId)) {
      orderArray.push(item)
      footer.classList.add('footer-active')
      order += `
    <div class="item-content">
        <div class="item">
          <h3>${item.name}</h3>
          <button class="remove-btn">remove</button>
        </div>
        <p class="bold price">$${item.price}</p>
      </div>
  `
  itemContainer.innerHTML += order
    } 
  });
}

