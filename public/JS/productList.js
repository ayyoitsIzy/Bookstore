 function addtogrid(data){
    const grid = document.getElementById("product-grid")
    const listofproduct =  data;

    for (let i = 0; i<listofproduct.length ;i++){

        const productcard = document.createElement("div");
        productcard.className = "product-card";
        

        const h4 = document.createElement("h4");
        h4.textContent = listofproduct.at(i).Prod_name;
        h4.className = "product-name";

        const p = document.createElement("p");
        p.textContent = listofproduct.at(i).Price;
        p.className = "product-price";

        productcard.appendChild(p);
        productcard.appendChild(h4)

        grid.appendChild(productcard);

        productcard.addEventListener("click",() =>{
            //console.log(listofproduct.at(i).Prod_ID);
            window.location.href = `/product_info?id=`+listofproduct.at(i).Prod_ID;
        })
    }
}
 const params = new URLSearchParams(window.location.search);
 const page = params.get("page");
 const orderby = params.get("orderby");

async function test(){

 const string = "/product/productlist/" + page + "/"+orderby

fetch(string)
  .then(res => res.json())
  .then(data => {
    addtogrid(data)
  })
  .catch(err => {
    console.log(err)
  });

 
}

addtogrid(test());

const current = document.getElementById("page-dots")
const prev = document.getElementById("page-prev")
const next = document.getElementById("page-next")

const price = document.getElementById("price")
const popular = document.getElementById("popular")
const latest = document.getElementById("latest")

current.textContent = page;

price.addEventListener("click",() =>{
    if (orderby === "priceup"){
        window.location.href = "/product?page=" + page + "&orderby=pricedown"
    }else{
        window.location.href = "/product?page=" + page + "&orderby=priceup"
    }
    

})

popular.addEventListener("click",() =>{
    window.location.href = "/product?page=" + page + "&orderby=popular"
})
latest.addEventListener("click",() =>{
    window.location.href = "/product?page=" + page + "&orderby=latest"
})

next.addEventListener("click",() =>{
    window.location.href = "/product?page=" + (parseInt(page)+1) + "&orderby="+orderby
})
prev.addEventListener("click",() =>{
    window.location.href = "/product?page=" + (parseInt(page)-1) + "&orderby="+orderby
})


