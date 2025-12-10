let number = 1;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
fetch("/product/product_info/"+id)
  .then(res => res.json())
  .then(async data => {

    const show =  document.getElementsByClassName("quantity-display")[0];
    const decrease = document.getElementsByClassName("quantity-minus")[0];
    const increase = document.getElementsByClassName("quantity-plus")[0];
    const title = document.getElementById("product-title")
    const price = document.getElementById("product-price")
    const stock = document.getElementById("stock-warning")
    const type = document.getElementById("product-type")
    const description = document.getElementById("product-description")
    title.textContent= data.Prod_name
    price.textContent= data.Price + "บาท"
    stock.textContent= "*คงเหลือ " + data.Product_stock + "ชิ้น " 
    description.textContent= "รายละเอียด : " + data.description;
    type.textContent = data.Category;
    increase.addEventListener("click",()=>{
      if(number >= data.Product_stock ){
        alert("too Much!")
        return;
    }
      number += 1;
      show.textContent = number;
    })
    decrease.addEventListener("click",()=>{
      if(number <= 1 ){
        alert("too little!")
        return;
      }
      number -= 1;
      show.textContent = number;
    })
  })
  .catch(err => {
    console.log(err)
  });
  fetch("/product/product_img/"+id)
  .then(res => res.json())
  .then(async data => {
    const main = document.getElementsByClassName("product-image-large")
    const mainimg = main[0].querySelector("img");
    mainimg.src = data.at(0).Path
    for (let i = 0 ;i < data.length;i++){
      const div = document.getElementsByClassName("related-images")[0].getElementsByClassName("related-list")[0]
      const img = document.createElement('img');
      img.src = data.at(i).Path
      img.addEventListener("click",()=>{
        console.log(data.at(i).Path);
        mainimg.src = data.at(i).Path;
      })
      div.appendChild(img);
    }
  })
  .catch(err => {
    console.log(err)
  });



  
const addbutton = document.getElementsByClassName("add-to-cart-btn")[0].addEventListener("click",async ()=>{
   res = fetch("/basket/add_product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
            prod_ID:id,
            amount:number
        })
    })
})