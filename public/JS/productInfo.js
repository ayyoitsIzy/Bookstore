function isStringAllNumbers(str) {
  return /^\d+$/.test(str);
}
let number = 1;
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function showProductMessage(message, type = "error") {
  const box = document.getElementById("product-message");
  if (!box) {
    console.log(message);
    return;
  }

  box.textContent = message || "";
  box.className = "product-message" + (type === "success" ? " success" : "");
  box.style.display = message ? "block" : "none";
}

fetch("/product/product_info/" + id)
  .then(res => res.json())
  .then(async data => {

    const show = document.getElementsByClassName("quantity-display")[0];
    const decrease = document.getElementsByClassName("quantity-minus")[0];
    const increase = document.getElementsByClassName("quantity-plus")[0];
    const title = document.getElementById("product-title");
    const price = document.getElementById("product-price");
    const stock = document.getElementById("stock-warning");
    const type = document.getElementById("product-type");
    const description = document.getElementById("product-description");
    const productWrapper = document.querySelector(".product-wrapper");
    const addbutton = document.getElementsByClassName("add-to-cart")[0];

    title.textContent = data.Prod_name;
    price.textContent = data.Price + "บาท";
    stock.textContent = "*คงเหลือ " + data.Product_stock + "ชิ้น";
    description.textContent = "รายละเอียด : " + data.description;
    type.textContent = data.Category;

    show.value = number;

    increase.addEventListener("click", () => {
      if (number >= data.Product_stock) {
        showProductMessage("เกินจำนวนในสต็อกแล้ว");
        return;
      }
      number += 1;
      show.value = number;
      showProductMessage("");
    })
    decrease.addEventListener("click", () => {
      if (number <= 1) {
        showProductMessage("ลดลงไม่ได้แล้ว");
        return;
      }
      number -= 1;
      show.value = number;
    })
show.addEventListener("keypress",function(event) {
        if(event.key === "Enter"){
             if (show.value > data.Product_stock || show.value  <= 0 ||!isStringAllNumbers(show.value)) {
                show.value = number;
             } else {
              number = parseInt(show.value);
             }
        }
    })

  })

  .catch(err => {
    console.log(err);
    showProductMessage("โหลดข้อมูลไม่สำเร็จ ลองใหม่อีกครั้ง");
  });

fetch("/product/product_img/" + id)
  .then(res => res.json())
  .then(async data => {
    const main = document.getElementsByClassName("product-image-large");
    const mainimg = main[0].querySelector("img");
    mainimg.src = data.at(0).Path;

    for (let i = 0; i < data.length; i++) {
      const div = document.getElementsByClassName("related-images")[0].getElementsByClassName("related-list")[0];
      const img = document.createElement("img");
      img.src = data.at(i).Path;
      img.addEventListener("click", () => {
        mainimg.src = data.at(i).Path;
        showProductMessage("");
      });
      div.appendChild(img);
    }
  })
  .catch(err => {
    showProductMessage("โหลดรูปสินค้าไม่สำเร็จ");
  });

const addbutton = document.getElementsByClassName("add-to-cart")[0];
addbutton.addEventListener("click", async () => {
  if (addbutton.disabled) {
    showProductMessage("สินค้าหมด ไม่สามารถเพิ่มลงตะกร้าได้");
    return;
  }

  try {
    const res = await fetch("/basket/add_product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        prod_ID: id,
        amount: number
      })
    });

    if (!res.ok) {
      showProductMessage("เพิ่มสินค้าลงตะกร้าไม่สำเร็จ");
      return;
    }

    showProductMessage("เพิ่มสินค้าลงตะกร้าแล้ว", "success");
  } catch (err) {
    console.log(err);
    showProductMessage("เพิ่มสินค้าลงตะกร้าไม่สำเร็จ");
  }
});