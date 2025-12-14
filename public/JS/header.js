const right = document.getElementsByClassName("header-right")[0]

const img = document.createElement("img");
img.src = ("/IMG/MenuIMG/user.png");



const left = document.getElementsByClassName("header-left")[0]
const home = left.querySelector("img");
home.addEventListener("click",()=>{
   window.location.href = "/";
})

right.appendChild(img);
const div = document.createElement("div");
fetch("/user/user_info")
  .then(res => res.json())
  .then(async data => {
    console.log(data);
    div.textContent = data.First_name
    div.addEventListener("click",()=>{
    window.location.href = "/user_info";
    })

    const basket_icon = document.createElement("img");
    basket_icon.src = ("/IMG/MenuIMG/cart.webp");
    basket_icon.addEventListener("click",()=>{
        window.location.href = "/basket";
    })
    const logout_icon = document.createElement("img");
    logout_icon.src = ("/IMG/MenuIMG/logout.png");
    logout_icon.addEventListener("click",()=>{
        res = fetch("/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include'
    })
      window.location.href = "/login";
    
    })
    right.appendChild(logout_icon);
    right.appendChild(basket_icon);

  }).catch(()=>{
    div.textContent = "ลงชื่อเข้าใช้"
    div.addEventListener("click",()=>{
    window.location.href = "/login";
    })
  });



right.appendChild(div);
