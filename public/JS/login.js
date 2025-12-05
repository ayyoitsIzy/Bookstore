async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send data to backend for validation
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });

  
//     const data = await res.json();

//   if(!data.success){
//     alert("Login failed!");
//     return;
//   }

  // Redirect to test page with params
  window.location.href = `/test.html`;
}