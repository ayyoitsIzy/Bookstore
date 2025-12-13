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
  }).catch(()=>{
    div.textContent = "ลงชื่อเข้าใช้"
    div.addEventListener("click",()=>{
    window.location.href = "/login";
    })
  });
right.appendChild(div);
const basket_icon = document.createElement("img");
basket_icon.src = ("/IMG/MenuIMG/basket.png");

basket_icon.addEventListener("click",()=>{
    window.location.href = "/basket";
})


right.appendChild(basket_icon);

