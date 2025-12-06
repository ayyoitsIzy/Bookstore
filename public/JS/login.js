
function isStringAllNumbers(str) {
  return /^\d+$/.test(str);
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

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
     alert(data.error);
     return;
   }


window.location.href = `/user_info`;
}


async function register() {
  
  const password = document.getElementById("New password").value;
  const Name = document.getElementById("Name").value;
  const Surname = document.getElementById("Surname").value;
  const phone = document.getElementById("Mobile phone number").value;
  const Email = document.getElementById("Email").value;

   

  // Send data to backend for validation
  const res = await fetch("/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ password,Name,Surname,phone,Email})
  });


  const data = await res.json();

   if(!data.success){
     alert("register failed");
     return;
   }

  window.location.href = `/user_info`;
}