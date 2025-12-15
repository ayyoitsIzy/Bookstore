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
    const button = document.createElement("button");
    button.id = "delete-account"
    button.textContent = "ลบaccount"
    button.addEventListener("click", async () => {
          try {
            const res = await fetch("/user/delete_account", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            });

            const status = await res.json();

            if (status.success) {
              location.reload();
            } else {
              alert("error");
            }
          } catch (err) {
            console.error(err);
            alert("network error");
          }
        });
    document.getElementsByClassName("user-details")[0].appendChild(button);
  }).catch(err => {
    nametextbox.textContent = "NOT LOGIN!";
    console.log("login first")
    console.log(err)
  });


