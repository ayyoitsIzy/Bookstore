document.addEventListener("DOMContentLoaded", () => {
    setupHero();
    setupCategorie();
    setupPromotion();
    loadRecommendedProduct();
});
function setupHero() {
    const heroImg = document.getElementById("hero-main");
    if (!heroImg) return;

    const banners = [
        "/IMG/news/news1.gif",
        "/IMG/news/news2.gif",
        "/IMG/news/news3.png",
        "/IMG/news/news4.gif",
        "/IMG/news/news5.png",
        "/IMG/news/news6.png"
    ];
    if (banners.length > 0) {
        heroImg.src = banners[1];
    }
}
function setupCategorie() {
    const container = document.querySelector(".category-list");
    if (!container) return;

  const categories = [
        { icon: "/IMG/MenuIMG/pen.png",label: "เครื่องเขียน",page:`/product?page=1&orderby=latest&category=Stationery `},
        { icon: "/IMG/MenuIMG/book2.png",label: "หนังสือ / Textbook",page:`/product?page=1&orderby=latest&category=Books ` },
        { icon: "/IMG/MenuIMG/art.png",label: "อุปกรณ์ศิลปะ",page: `/product?page=1&orderby=latest&category=Art Supplies `},
        { icon: "/IMG/MenuIMG/measure-tape.png",label: "Accessories",page: `/product?page=1&orderby=latest&category=Accessories `},
        { icon: "/IMG/MenuIMG/tailor.png",label: "รับตัดเสื้อช็อป",page: `/custom_order` },
        { icon: "/IMG/MenuIMG/more.png",label: "ดูทั้งหมด",page: `/product?page=1&orderby=latest `}
    ];
    container.innerHTML = "";

    categories.forEach(cat => {
        const item = document.createElement("div");
        item.className = "category-item";
        item.addEventListener("click", () => {window.location.href = cat.page;});

        const img = document.createElement("img");
        img.src = cat.icon;
        img.alt = cat.label;

        const span = document.createElement("span");
        span.textContent = cat.label;


        item.appendChild(img);
        item.appendChild(span);
        container.appendChild(item);

       
        
     
    });
}

function setupPromotion() {
    const container = document.querySelector(".promotion-list");
    if (!container) return;

    const promos = [
        "/IMG/news/news5.png",
        "/IMG/news/news6.png",
        "/IMG/news/news5.png",
        "/IMG/news/news6.png"
    ];

    container.innerHTML = "";

    promos.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Promotion";
        container.appendChild(img); 

        img.addEventListener("click", () => {
            if (src === "/IMG/news/news5.png") {
                window.location.href = "/promotion?id=1";
            } else {
                window.location.href = "/promotion?id=2";
            }
            
        });
    });
}

function loadRecommendedProduct() {
    const list = document.querySelector(".recommended-list");
    if (!list) return;

    fetch("/product/productlist/1/latest/null")
        .then(res => res.json())
        .then(data => { 
            list.innerHTML = "";
            if (!Array.isArray(data) || data.length === 0) {
                return;
            }

            const firstTen = data.slice(0, 10);

            firstTen.forEach(prod => {
                const card = document.createElement("div");
                card.className = "recommended-card";

                const img = document.createElement("img");
                img.src = prod.Thumbnail;
                img.alt = prod.Prod_name || "";

                const name = document.createElement("p");
                name.className = "recommended-name";
                name.textContent = prod.Prod_name;

                const price = document.createElement("p");
                price.className = "recommended-price";
                price.textContent = "฿" + prod.Price;

                card.appendChild(img);
                card.appendChild(name);
                card.appendChild(price);

                list.appendChild(card);

                card.addEventListener("click", () => {
                    window.location.href = "/product_info?id=" + prod.Prod_ID;
                });
            });
        })
        .catch(err => {
            console.log("เกิดข้อผิดพลาด", err);
        });
}
