
function isStringAllNumbers(str) {
  return /^\d+$/.test(str);
}


function showError(boxId, message) {
  const box = document.getElementById(boxId);
  if (!box) return;
  box.textContent = message;
  box.style.display = "block";
}


async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

const loginErrorBox = document.getElementById("login-error");
  if (loginErrorBox) {
    loginErrorBox.style.display = "none";
    loginErrorBox.textContent = "";
  }


  // Send data to backend for validation
    let res;
    if (isStringAllNumbers(username)){
        console
        res = await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
            Phone: username,
            password: password
        })
    })
    }else{
        res = await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({Email : username,password})
        });
    }

    const data = await res.json();

    if(!data.success){
      showError("login-error", data.error || "เข้าสู่ระบบไม่สำเร็จ");
    return;
  }

   window.location.href = `/user_info`



}


async function register() {
  
  const password = document.getElementById("New password").value;
  const Name = document.getElementById("Name").value;
  const Surname = document.getElementById("Surname").value;
  const phone = document.getElementById("Mobile phone number").value;
  const Email = document.getElementById("Email").value;
  

  const regErrorBox = document.getElementById("register-error");
  if (regErrorBox) {
    regErrorBox.style.display = "none";
    regErrorBox.textContent = "";
  }
  
  if(password === "" || Name === "" || phone === "" || Email === "" || Surname === ""){
    showError("register-error","กรุณากรอกข้อมูล");
    return;
  }
   

  // Send data to backend for validation
  const res = await fetch("/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ password,Name,Surname,phone,Email,Tier:"member"})
  });


  const data = await res.json();
  console.log("done1")

   if(!data.success){
     showError("register-error", data.error || "สมัครสมาชิกไม่สำเร็จ");
    return;
  }
   console.log("done2")
  window.location.href = `/user_info`;
}

function flipToRegister(){
  document.getElementById("authFlip").classList.add("is-flipped");
}
function flipToLogin(){
  document.getElementById("authFlip").classList.remove("is-flipped");
}