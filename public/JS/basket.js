  let total = 0;
  
  fetch("/basket/get_basket")
  .then(res => res.json())
  .then(data => {
    console.log(data);
      const item_count = document.getElementsByClassName("item-count")[0]
      item_count.textContent =  data.length + " รายการ"
      const basket_table = document.getElementsByClassName("basket-table")[0];
    for(let i = 0;i<data.length;i++){
      let localamount = parseInt(data[i].amount);
      const basket_row = document.createElement("div");
      basket_row.className - "basket-row"

      const basket_item = document.createElement("div");
      basket_item.className = "basket-item";

      const img = document.createElement("img");
      img.src = data[i].img;
      const p = document.createElement("p");
      p.className = "item-name";
      p.textContent = data[i].prod_name;

      basket_item.appendChild(img);
      basket_item.appendChild(p);

      basket_row.appendChild(basket_item);

      const span = document.createElement("span");
      span.className = "item-price";
      span.textContent = data[i].price
      basket_row.appendChild(span);

      const item_qty = document.createElement("div");
      item_qty.className = "item-qty";

      const amount = document.createElement("span");
      amount.textContent = localamount
      
      
      const minus = document.createElement("button");
      minus.textContent = "-"
      minus.addEventListener("click",async ()=>{
        let res =  fetch("/basket/decrease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({index : i})
        });
        let status = await res.json;

        amount.textContent -= 1;
        total -= data[i].price;
        localamount -= 1
        item_total.textContent = (localamount) * data[i].price
        summary_total.textContent = total;
        if (amount.textContent == 0) {
          console.log(data.length-1)
          summary_text.textContent = "รายการรวมทั้งสิ้น " + (data.length-1) + " รายการ"
          item_count.textContent =  (data.length-1) + " รายการ"
          console.log("deleted")
          basket_row.remove;
          basket_table.removeChild(basket_row);
          location.reload()
        }
      })

      
      const plus = document.createElement("button");
      plus.textContent = "+"
      if ("promotion_ID" in data[i]) {
        plus.addEventListener("click", async()=>{
          let res = await fetch("/basket/increase_promotion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({index : i,promotion_ID:data[i].promotion_ID})
        });
        const status = await res.json();
         if (status.success) {
           console.log(data);
          total =  parseInt(total) + parseInt(data[i].price);
          summary_total.textContent = total;
          localamount += 1;
          item_total.textContent = (localamount) * data[i].price
          console.log(localamount);
          amount.textContent = parseInt(amount.textContent)+1;
        } else {
          alert("error");
        }
        })
      } 
      if ("prod_ID" in data[i]) {
        plus.addEventListener("click",async ()=>{
        let res = await fetch("/basket/increase_product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({index : i})
        });
        const status = await res.json();
        if (status.success) {
           console.log(data);
          total =  parseInt(total) + parseInt(data[i].price);
          summary_total.textContent = total;
          localamount += 1;
          item_total.textContent = (localamount) * data[i].price
          console.log(localamount);
          amount.textContent = parseInt(amount.textContent)+1;
        } else {
          alert("error");
        }
      }) 
      }

      

      item_qty.appendChild(minus);
      item_qty.appendChild(amount);
      item_qty.appendChild(plus);

      if("name" in data[i])
        {
          item_qty.removeChild(minus);
          item_qty.removeChild(plus);
        }

      const item_total = document.createElement("span");
      item_total.className = "item-total"
      item_total.textContent = localamount * data[i].price;
      total += localamount * data[i].price;

      const remove = document.createElement("button");
      remove.textContent = "🗑"
      remove.addEventListener("click",async ()=>{
        let res = await fetch("/basket/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({index : i})
        });
        const status = await res.json();
        if (status.success) {
          total -= localamount * data[i].price;
          summary_total.textContent = total
          console.log(data.length-1)
          summary_text.textContent = "รายการรวมทั้งสิ้น " + (data.length-1) + " รายการ"
          item_count.textContent =  (data.length-1) + " รายการ"
          console.log("deleted")
          basket_row.remove;
          basket_table.removeChild(basket_row);
          location.reload()
        } else {
          alert("error");
        }
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




document.getElementsByClassName("checkout-btn")[0].addEventListener("click",() =>{
  let res =  fetch("/basket/make_bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify()
        });
})