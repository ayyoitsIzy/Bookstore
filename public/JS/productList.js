const params = new URLSearchParams(window.location.search);
let page = parseInt(params.get("page") || "1", 10);
let orderby = params.get("orderby") || "latest";
let Category = params.get("category");
const MAX_PAGE = 30;
function addtogrid(data) {
    const grid = document.getElementById("product-grid");
    const listofproduct = data || [];

    grid.innerHTML = "";

    for (let i = 0; i < listofproduct.length; i++) {
        const product = listofproduct[i];

        const productcard = document.createElement("div");
        productcard.className = "product-card";

        const img = document.createElement("img");
        img.src = product.Thumbnail;
        img.alt = product.Prod_name || "";
        console.log(product.Thumbnail);

        const h4 = document.createElement("h4");
        h4.textContent = product.Prod_name;
        h4.className = "product-name";

        const p = document.createElement("p");
        p.textContent = "฿" + product.Price;
        p.className = "product-price";
        productcard.appendChild(img);
        productcard.appendChild(h4);
        productcard.appendChild(p);


        const stock = product.Product_stock
                    console.log(stock)
                    console.log(data)
;
        const isOutOfStock = !isNaN(stock) && stock <= 0
                    console.log(isOutOfStock)
;

        if (isOutOfStock) {
            productcard.classList.add("out-of-stock");

            const badge = document.createElement("div");
            badge.className = "sold-out-badge";
            badge.textContent = "สินค้าหมด";
            productcard.appendChild(badge);
        }

        grid.appendChild(productcard);

        productcard.addEventListener("click", () => {
            window.location.href = "/product_info?id=" + product.Prod_ID;
        });
    }
}
function test() {
    const url = "/product/productlist/" + page + "/" + orderby + "/" + Category;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            addtogrid(data);
        })
        .catch(err => {
            console.log(err);
        });
}
document.addEventListener("DOMContentLoaded", () => {
    const current = document.getElementById("page-dots");
    const prev = document.getElementById("page-prev");
    const next = document.getElementById("page-next");

    const priceSort = document.getElementById("price-sort");
    const popular = document.getElementById("popular");
    const latest = document.getElementById("latest");

    current.textContent = page;

    if (orderby === "priceup" || orderby === "pricedown") {
        priceSort.value = orderby;
    }
    function updateActiveTabs() {
        latest.classList.toggle("active", orderby === "latest");
        popular.classList.toggle("active", orderby === "popular");
    }
    updateActiveTabs();

    priceSort.addEventListener("change", () => {
        const value = priceSort.value;
        if (!value) return;
        window.location.href = "/product?page=1&orderby=" + value + "&category=" + Category;
    });
    popular.addEventListener("click", () => {
        window.location.href = "/product?page=1&orderby=popular" + "&category=" + Category;
    });
    latest.addEventListener("click", () => {
        window.location.href = "/product?page=1&orderby=latest" + "&category=" + Category;
    });

    if (page <= 1) {
        prev.disabled = true;
    } else {
        prev.addEventListener("click", () => {
            const newPage = page - 1;
            window.location.href = "/product?page=" + newPage + "&orderby=" + orderby + "&category=" + Category;
        });
    }
    if (page >= MAX_PAGE) {
        next.disabled = true;
    } else {
        next.addEventListener("click", () => {
            const newPage = page + 1;
            window.location.href = "/product?page=" + newPage + "&orderby=" + orderby + "&category=" + Category;
        });
    }
    test();
});