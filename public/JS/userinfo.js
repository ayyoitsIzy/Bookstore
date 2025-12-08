const nametextbox = document.getElementById("name")
const last_nametextbox = document.getElementById("last_name")
const phonetextbox = document.getElementById("phone")
const emailtextbox = document.getElementById("email")
const membership_ranktextbox = document.getElementById("membership_rank")

fetch("/user/user_info")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    nametextbox.textContent = "ชื่อ: " + data.First_name;
    last_nametextbox.textContent = "นามสกุล: " + data.Last_name
    phonetextbox.textContent = "เบอร์โทร: " + data.Phone;
    emailtextbox.textContent = "อีเมล: " + data.Email;
    membership_ranktextbox.textContent = "Membership Rank: " + data.Tier;
  })
  .catch(err => {
    nametextbox.textContent = "NOT LOGIN!";
    console.log("login first")
    console.log(err)
  });
