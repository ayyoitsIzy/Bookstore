const right = document.getElementsByClassName("header-right")[0]

const img = document.createElement("img");
img.src = ("/IMG/MenuIMG/user.png");
img.id = "profile-pic";
img.addEventListener("click",()=>{
        window.location.href = "/login";
    })

const search = document.getElementsByClassName("search-bar")[0]

const search_icon = document.createElement("img");
search_icon.src = ("/IMG/MenuIMG/search.png");
search.appendChild(search_icon);
search_icon.addEventListener("click",()=>{
  const value = document.querySelector('.search-bar input').value;
  window.location.href = `/product?page=1&orderby=latest&category=search"`+value+`"`;
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

    const review_icon = document.createElement("img");
    review_icon.src = ("/IMG/MenuIMG/review.png");
    review_icon.addEventListener("click",()=>{
        window.location.href = "/comment";
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
    right.appendChild(basket_icon);
    left.appendChild(status);
    left.appendChild(review_icon);
  }).catch(()=>{
    div.textContent = "ลงชื่อเข้าใช้"
    div.addEventListener("click",()=>{
    window.location.href = "/login";
    })
  });



right.appendChild(div);
