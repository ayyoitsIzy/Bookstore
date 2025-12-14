const right = document.getElementsByClassName("header-right")[0]

const img = document.createElement("img");
img.src = ("/IMG/MenuIMG/user.png");
img.addEventListener("click",()=>{
        window.location.href = "/login";
    })



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
    img.addEventListener("click",()=>{
        window.location.href = "/user_info";
    })

    const basket_icon = document.createElement("img");
    basket_icon.src = ("/IMG/MenuIMG/cart.png");
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
    const status = document.createElement("img");
    status.src = ("/IMG/MenuIMG/tailor_status.png");
    status.addEventListener("click",()=>{
      window.location.href = "/status";
    })
    right.appendChild(logout_icon);
    left.appendChild(basket_icon);
    left.appendChild(status);
  }).catch(()=>{
    div.textContent = "ลงชื่อเข้าใช้"
    div.addEventListener("click",()=>{
    window.location.href = "/login";
    })
  });



right.appendChild(div);
