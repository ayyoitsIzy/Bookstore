const nametextbox = document.getElementById("name")

fetch("/user/user_info")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    nametextbox.textContent = "ชื่อ: "+data.First_name;
  })
  .catch(err => {
    nametextbox.textContent = "ชื่อ: NOT LOG IN !";
    console.log("login first")
    console.log(err)
  });