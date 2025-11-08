import { menuArray } from "./data.js";

function render() {
  return menuArray
    .map(item => {
      const { name, ingredients, id, price, emoji } = item;
      return `
    <section class="item-container" id='${name}-${id}'>
      <div class='content'>
        <div class="emoji" aria-label='${name}'>${emoji}</div>
          <div class="text">
            <h3 class='name'>${name}</h3>
            <p class='ingredients'>${ingredients}</p>
            <p class="bold">$${price}</p>
          </div>
        </div>
        <button class="order-btn">+</button>
      </section>
      <div class='border-bottom'></div>
    `;
    })
    .join("");
}

document.getElementById("main").innerHTML = render();
