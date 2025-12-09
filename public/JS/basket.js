
  fetch("/basket/get_basket")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => console.error("Error:", err));
