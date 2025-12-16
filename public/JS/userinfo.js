const nametextbox = document.getElementById("name")
const last_nametextbox = document.getElementById("last_name")
const phonetextbox = document.getElementById("phone")
const emailtextbox = document.getElementById("email")
const membership_ranktextbox = document.getElementById("membership_rank")

const modal = document.getElementById("delete-modal");
const passInput = document.getElementById("delete-password");
const btnCancel = document.getElementById("delete-cancel");
const btnConfirm = document.getElementById("delete-confirm");

let errBox = document.getElementById("delete-err");
if (!errBox && modal) {
  errBox = document.createElement("div");
  errBox.id = "delete-err";
  errBox.style.display = "none";
  errBox.style.marginTop = "10px";
  errBox.style.color = "red";
  errBox.style.fontSize = "14px";
  modal.querySelector(".modal-card")?.appendChild(errBox);
}

let currentEmail = null;

function openDeleteModal() {
  errBox.style.display = "none";
  errBox.textContent = "";
  passInput.value = "";
  modal.style.display = "flex";
  passInput.focus();
}

function closeDeleteModal() {
  modal.style.display = "none";
  passInput.value = "";
}

btnCancel.addEventListener("click", closeDeleteModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeDeleteModal(); });
passInput.addEventListener("keydown", (e) => { if (e.key === "Enter") btnConfirm.click(); });

btnConfirm.addEventListener("click", async () => {
  const password = passInput.value.trim();
  if (!password) {
    errBox.style.display = "block";
    errBox.textContent = "กรุณากรอกรหัสผ่าน";
    return;
  }
  if (!currentEmail) {
    errBox.style.display = "block";
    errBox.textContent = "โหลดข้อมูลผู้ใช้ไม่เสร็จ";
    return;
  }

  try {
    const checkRes = await fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ Email: currentEmail, password })
    });
    const check = await checkRes.json();

    if (!check.success) {
      errBox.style.display = "block";
      errBox.textContent = check.error || "รหัสผ่านไม่ถูกต้อง";
      return;
    }

    const delRes = await fetch("/user/delete_account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const del = await delRes.json();

    if (del.success) location.reload();
    else {
      errBox.style.display = "block";
      errBox.textContent = "ลบไม่สำเร็จ";
    }
  } catch (err) {
    console.error(err);
    alert("network error");
  }
});


fetch("/user/user_info")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    currentEmail = data.Email;

    nametextbox.textContent = "ชื่อ: " + data.First_name;
    last_nametextbox.textContent = "นามสกุล: " + data.Last_name
    phonetextbox.textContent = "เบอร์โทร: " + data.Phone;
    emailtextbox.textContent = "อีเมล: " + data.Email;
    membership_ranktextbox.textContent = "Membership Rank: " + data.Tier;
    const button = document.createElement("button");
    button.id = "delete-account"
    button.textContent = "Delete Account"
    button.addEventListener("click", () => {
      openDeleteModal();
    });
    document.getElementsByClassName("user-details")[0].appendChild(button);
  }).catch(err => {
    nametextbox.textContent = "NOT LOGIN!";
    console.log("login first")
    console.log(err)
  });



  