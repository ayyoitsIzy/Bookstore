async function test(){
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
fetch("/product/product_info/"+id)
  .then(res => res.json())
  .then(data => {
    const title = document.getElementById("product-title")
    const price = document.getElementById("product-price")
    const stock = document.getElementById("stock-warning")
    const description = document.getElementById("product-description")
    title.textContent= data.Prod_name
    price.textContent= data.Price + "บาท"
    stock.textContent= "*คงเหลือ " + data.Product_stock + "ชิ้น " 
    description.textContent= data.Category

  })
  .catch(err => {
    console.log(err)
  });

}
// const params = new URLSearchParams(window.location.search);
// const id = params.get("id");
// console.log(id);
test()