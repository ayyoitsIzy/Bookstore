fetch("/api/check_session")
  .then(res=>res.json())
  .then(data=>{
    if (data.login === false || data.login === undefined){
      const list = document.querySelector("h1");
      list.textContent = "Login si i kuy";
    }else{
      fetch("/api/users")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("user-list");
    list.innerHTML = "";
    data.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.username}. ${user.password}`;
      list.appendChild(li);
    });
  })
  .catch(err => console.error("Error:", err));
    }
  })


// fetch("/api/users")
//   .then(res => res.json())
//   .then(data => {
//     const list = document.getElementById("user-list");
//     list.innerHTML = "";
//     data.forEach(user => {
//       const li = document.createElement("li");
//       li.textContent = `${user.username}. ${user.password}`;
//       list.appendChild(li);
//     });
//   })
//   .catch(err => console.error("Error:", err));