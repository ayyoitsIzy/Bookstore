
  async function get() {
  console.log("test");
  fetch("/api/user_session")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => console.error("Error:", err));
}