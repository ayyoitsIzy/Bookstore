{/* <div class="basket-row">
            <div class="basket-item">
                <img src="" alt="">
                <p class="item-name"></p>
            </div>

            <span class="item-price"></span>

            <div class="item-qty">
                <button>-</button>
                <span>1</span>
                <button>+</button>
            </div>

            <span class="item-total"></span>

            <button class="delete-item">🗑</button>
        </div>
  
   */}
  
  //Prod_ID, Prod_name, Price, Thumbnail

  let total = 0;
  
  fetch("/basket/get_basket")
  .then(res => res.json())
  .then(data => {
    console.log(data);
      const item_count = document.getElementsByClassName("item-count")[0]
      item_count.textContent =  data.length + " รายการ"
      const basket_table = document.getElementsByClassName("basket-table")[0];
    for(let i = 0;i<data.length;i++){
      const basket_row = document.createElement("div");
      basket_row.className - "basket-row"

      const basket_item = document.createElement("div");
      basket_item.className = "basket-item";

      const img = document.createElement("img");
      img.src = data[i].img;
      const p = document.createElement("p");
      p.className = "item-name";

      basket_item.appendChild(img);
      basket_item.appendChild(p);

      basket_row.appendChild(basket_item);

      const span = document.createElement("span");
      span.className = "item-price";
      span.textContent = data[i].price
      basket_row.appendChild(span);

      const item_qty = document.createElement("div");
      item_qty.className = "item-qty";
      
      const minus = document.createElement("button");
      minus.textContent = "-"
      minus.addEventListener("click",()=>{
        console.log("minus to be implement")
      })

      const amount = document.createElement("span");
      amount.textContent = data[i].amount
      
      const plus = document.createElement("button");
      plus.textContent = "+"
      plus.addEventListener("click",()=>{
        console.log("plus to be implement")
      })

      item_qty.appendChild(minus);
      item_qty.appendChild(amount);
      item_qty.appendChild(plus);

      const item_total = document.createElement("span");
      item_total.className = "item-total"
      item_total.textContent = data[i].amount * data[i].price;
      total += data[i].amount * data[i].price;

      const remove = document.createElement("button");
      remove.textContent = "🗑"
      remove.addEventListener("click",()=>{
        console.log("🗑 to be implement")
      })
      basket_row.appendChild(basket_item);
      basket_row.appendChild(span);
      basket_row.appendChild(item_qty);
      basket_row.appendChild(item_total);
      basket_row.appendChild(remove);
      basket_table.appendChild(basket_row)
    }
    const summary_text = document.getElementsByClassName("summary-text")[0]
    summary_text.textContent = "รายการรวมทั้งสิ้น " + data.length + " รายการ"

    const summary_total = document.getElementsByClassName("summary-total")[0];
    summary_total.textContent = total;

  })
  .catch(err => console.log("Error:", err));
