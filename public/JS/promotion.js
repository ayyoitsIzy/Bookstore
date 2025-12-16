function showProductMessage(message, type = "error") {
  const box = document.getElementById("product-message");
  if (!box) return;

  box.textContent = message || "";
  box.className = "product-message" + (type === "success" ? " success" : "");
  box.style.display = message ? "block" : "none";
}


function isStringAllNumbers(str) {
  return /^\d+$/.test(str);
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let basket = {};
let number = 1;
let promoMax = null;

const show = document.getElementsByClassName("quantity-display")[0]

fetch("/promotion/promotion_info/"+id)
  .then(res => res.json()
  .then(async data => {
    console.log(data);
    const old_price = document.getElementsByClassName("old-price")[0];
    const new_price = document.getElementsByClassName("new-price")[0];
    const discount_percent = document.getElementsByClassName("discount-percent")[0];
    const promotion_title = document.getElementsByClassName("promotion-title")[0];
    const promotion_final_price = document.getElementsByClassName("promotion-final-price")[0];
    const promotion_banner = document.getElementsByClassName("promotion-banner")[0].querySelector("img");
    promotion_banner.src = data.Banner;
    old_price.textContent = data.Original_Price;
    new_price.textContent = data.Price + "บาท";
    discount_percent.textContent = (((data.Original_Price - data.Price)/data.Original_Price) * 100).toFixed(2) + "%" ;
    promotion_title.textContent = data.Promotion_Name;
    promotion_final_price.textContent = data.Price + "บาท";
    basket.img = data.Banner;
    basket.Promotion_id = data.Promotion_id;
    basket.prod_name = data.Promotion_Name;
    basket.price =data.Price;
  }))

//                     <span class="price-per-unit">300 บาท</span>
//                     <span class="quantity">1</span>
//                     <span class="item-total">300 บาท</span>
//     </div>

    fetch("/promotion/promotion_item/"+id)
  .then(res => res.json()
  .then(async data => {
    console.log(data);
    const promotion_item = document.getElementsByClassName("product-table")[0];
    for(let i = 0 ; i <data.length;i++){
        const table_row = document.createElement("div");
        table_row.className = "table-row";
        const product_info = document.createElement("div")
        product_info.className = "product-info";
        const img = document.createElement("img");
        img.src = data[i].Thumbnail;
        const name = document.createElement("span");
        name.className = "product-name"
        name.textContent = data[i].Prod_name;
      product_info.addEventListener("click",()=>{
        window.location.href = "/product_info?id=" + data[i].Prod_ID;
      })

        product_info.appendChild(img);
        product_info.appendChild(name);
        table_row.appendChild(product_info);

        const unit_price = document.createElement("span");
        unit_price.className = "price-per-unit";
        unit_price.textContent = data[i].price_per_item + "บาท"

        const amount = document.createElement("span");
        amount.className = "quantity";
        amount.textContent = data[i].amount

        const total = document.createElement("span");
        total.className = "item-total";
        total.textContent = data[i].total

        table_row.appendChild(unit_price);
        table_row.appendChild(amount);
        table_row.appendChild(total);

        promotion_item.appendChild(table_row);
    }

  }))

    
document.getElementsByClassName("add-promotion")[0]
  .addEventListener("click", async () => {

    try {
      const res = await fetch("/basket/add_promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          img: basket.img,
          prod_name: basket.prod_name,
          promotion_ID: id,
          price: basket.price,
          amount: number
        })
      });

      if (!res.ok) {
        showProductMessage("เพิ่มโปรโมชันลงตะกร้าไม่สำเร็จ");
        return;
      }

      showProductMessage("เพิ่มโปรโมชันลงตะกร้าแล้ว", "success");
    } catch (err) {
      console.log(err);
      showProductMessage("เพิ่มโปรโมชันลงตะกร้าไม่สำเร็จ");
    }
  });


fetch("/basket/promotion_limit/" + id)
  .then(res => res.json())
  .then(async data => {
    promoMax = Math.floor(Number(data.max))


    const add = document.getElementsByClassName("add-promotion")[0];
    const plus = document.getElementsByClassName("quantity-plus")[0];
    const minus = document.getElementsByClassName("quantity-minus")[0];
    const display_limit = document.getElementById("limit");
    display_limit.textContent = "*เหลือ "+ Math.floor(promoMax);
    if (!promoMax || promoMax <= 0) {
      add.disabled = true;
      add.classList.add("disabled");

      plus.disabled = true;
      minus.disabled = true;
      show.disabled = true;

      number = 0;
      show.value = 0;

      showProductMessage("สินค้าหมด ไม่สามารถเพิ่มลงตะกร้าได้");
      return;
    } else {
      add.disabled = false;
      add.classList.remove("disabled");

      plus.disabled = false;
      minus.disabled = false;
      show.disabled = false;

      number = 1;
      show.value = number;
      showProductMessage("");
    }

    plus.addEventListener("click", () => {
      if (number >= promoMax) {
        showProductMessage("เกินจำนวนที่กำหนดแล้ว");
        return;
      }
      number += 1;
      show.value = number;
      showProductMessage("");
    });

    minus.addEventListener("click", () => {
      if (number <= 1) {
        showProductMessage("ลดลงไม่ได้แล้ว");
        return;
      }
      number -= 1;
      show.value = number;
      showProductMessage("");
    });

    show.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        if (show.value > promoMax || show.value <= 0 || !isStringAllNumbers(show.value)) {
          show.value = number;
          showProductMessage("จำนวนไม่ถูกต้อง");
        } else {
          number = parseInt(show.value);
          showProductMessage("");
        }
      }
    });
  });
