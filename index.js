import { menuArray } from "./data.js";

const orderArray = [];
let priceArray = [];

const footer = document.querySelector(".footer");
const itemContainer = document.querySelector(".order-title");
const totalPrice = document.getElementById("price");

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    openOrderSummary(e.target.dataset.add);
  } 
  // else if (e.target.classList.contains("remove-btn")) {
  //   handleRemove(e.target);
  // }
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
          <button class="remove-btn">remove</button>
        </div>
        <p class="bold price">$${item.price}</p>
      </div>
  `;
      itemContainer.insertAdjacentHTML("beforeend", order);
    }
  });

  let value = priceArray.reduce((acc, cur) => acc + cur, 0);
  totalPrice.innerHTML = `$${value}`;
}

// function handleRemove(buttonEl) {
//   const itemName = buttonEl.previousElementSibling.textContent.trim();

//   const index = orderArray.findIndex(item => item.name === itemName);
//   if (index !== -1) {
//     orderArray.splice(index, 1)
//     priceArray.splice(index, 1)
//   }

//   buttonEl.closest('.item-content').remove()

//   const newTotal = priceArray.reduce((acc, cur) => acc + cur, 0)
//   totalPrice.textContent = `$${newTotal}`

//   if (priceArray.length === 0) {
//     footer.classList.remove('footer-active')
//   }
// }
