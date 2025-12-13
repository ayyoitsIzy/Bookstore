let total = 0;

fetch("/basket/get_basket")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const itemCountEl = document.getElementsByClassName("item-count")[0];
    let itemCount = data.length;
    itemCountEl.textContent = itemCount + " รายการ";
    const basketTable = document.getElementsByClassName("basket-table")[0];
    const headerRow = document.createElement("div");
    headerRow.className = "basket-row header-row";
    const headerLabels = ["รายการ", "ราคาต่อชิ้น", "จำนวน", "ราคารวม", ""];
    headerLabels.forEach(text => {
      const span = document.createElement("span");
      span.textContent = text;
      headerRow.appendChild(span);
    });
    basketTable.appendChild(headerRow);

    const summaryText = document.getElementsByClassName("summary-text")[0];
    const summaryTotal = document.getElementsByClassName("summary-total")[0];

    function updateSummary(){
      summaryText.textContent = "รายการสินค้ารวมทั้งสิ้น " + itemCount + " รายการ";
      summaryTotal.textContent = "ราคาทั้งสิ้น " + total + " ฿";
    }
    data.forEach((item, index) => {
      let localAmount = parseInt(item.amount, 10);
      const unitPrice = parseInt(item.price, 10);

      const basketRow = document.createElement("div");
      basketRow.className = "basket-row";

      const basketItem = document.createElement("div");
      basketItem.className = "basket-item";

      const img = document.createElement("img");
      img.src = item.img;
      img.alt = item.prod_name || item.name || "";

      const name = document.createElement("p");
      name.className = "item-name";
      name.textContent = item.prod_name || item.name || "";

      basketItem.appendChild(img);
      basketItem.appendChild(name);
      basketRow.appendChild(basketItem);

      const spanPrice = document.createElement("span");
      spanPrice.className = "item-price";
      spanPrice.textContent = unitPrice + "฿";
      basketRow.appendChild(spanPrice);

      const itemQty = document.createElement("div");
      itemQty.className = "item-qty";

      const minus = document.createElement("button");
      minus.textContent = "−";

      const amount = document.createElement("span");
      amount.textContent = localAmount;

      const plus = document.createElement("button");
      plus.textContent = "+";

      itemQty.appendChild(minus);
      itemQty.appendChild(amount);
      itemQty.appendChild(plus);
      if ("name" in item) {
        minus.style.display = "none";
        plus.style.display = "none";
        itemQty.style.justifyContent = "center";
      }

      basketRow.appendChild(itemQty);

      const itemTotal = document.createElement("span");
      itemTotal.className = "item-total";
      let lineTotal = localAmount * unitPrice;
      itemTotal.textContent = lineTotal + "฿";
      basketRow.appendChild(itemTotal);

      total += lineTotal;
      const remove = document.createElement("button");
      remove.className = "delete-item";
      remove.textContent = "🗑";
      basketRow.appendChild(remove);
      basketTable.appendChild(basketRow);
      minus.addEventListener("click", async () => {
        if (localAmount <= 1) {
          remove.click();
          return;
        }

        const res = await fetch("/basket/decrease", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ index })
        });
        const status = await res.json();
        if (!status.success) {
          alert("error");
          return;
        }

        localAmount -= 1;
        amount.textContent = localAmount;
        total -= unitPrice;
        itemTotal.textContent = localAmount * unitPrice + "฿";
        updateSummary();
        location.reload();
      });

      plus.addEventListener("click", async () => {
        let url = "";
        const body = { index };

        if ("promotion_ID" in item) {
          url = "/basket/increase_promotion";
          body.promotion_ID = item.promotion_ID;
        } else if ("prod_ID" in item) {
          url = "/basket/increase_product";
        } else {
          return;
        }

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body)
        });
        const status = await res.json();
        if (!status.success) {
          alert("error");
          return;
        }

        localAmount += 1;
        amount.textContent = localAmount;
        total += unitPrice;
        itemTotal.textContent = localAmount * unitPrice + "฿";
        updateSummary();
      });
      remove.addEventListener("click", async () => {
        const res = await fetch("/basket/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ index })
        });
        const status = await res.json();
        if (!status.success) {
          alert("error");
          return;
        }

        total -= localAmount * unitPrice;
        itemCount -= 1;
        basketRow.remove();
        updateSummary();
        location.reload();
      });
    });

    updateSummary();
  })
  .catch(err => console.log("Error:", err));




document.getElementsByClassName("checkout")[0].addEventListener("click",async () =>{
        let res = await fetch("/basket/make_bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify()
        });

      const status = await res.json();

      if (status.success) {
        alert("done");
        location.reload();
      } else {
        alert("error");
      }
})