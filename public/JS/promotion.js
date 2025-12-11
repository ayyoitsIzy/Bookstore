const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let basket = {};
let number = 1;
const show = document.getElementsByClassName("qty-display")[0]

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

    

const addbutton = document.getElementsByClassName("add-promotion-btn")[0].addEventListener("click",async ()=>{
   res = fetch("/basket/add_promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
            img : basket.img,
            prod_name : basket.prod_name,
            promotion_ID:id,
            price : basket.price,
            amount:number
        })
    })
    
})


fetch("/basket/promotion_limit/"+id)
  .then(res => res.json()
  .then(async data => {
              const plusbutton = document.getElementsByClassName("qty-plus")[0].addEventListener("click",async ()=>{
             if(number >= data.max ){
                  alert("too Much!")
                  return;
            }
            number += 1;
            show.textContent = number;
          })

          const minusbutton = document.getElementsByClassName("qty-minus")[0].addEventListener("click",async ()=>{
            if(number <= 1 ){
              alert("too little!")
              return;
            }
            number -= 1;
            show.textContent = number;
          })
  }))


