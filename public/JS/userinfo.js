fetch("/api/user_info")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log("Error:", err));