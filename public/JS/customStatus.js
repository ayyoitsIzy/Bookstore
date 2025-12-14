fetch("/custom/users_custom")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const item_count = document.getElementsByClassName("item-count")[0];
    item_count.textContent = "รายการสั่งตัดทั้งหมด " + data.length + " รายการ"

    const table = document.querySelector(".custom-table");

    for (let i = 0; i < data.length; i++) {

        const row = document.createElement("div");
        row.className = "custom-row";

        const name = document.createElement("div");
        name.textContent = data[i].NAME;

        const faculty = document.createElement("div");
        faculty.textContent = data[i].faculty;

        const waist = document.createElement("div");
        waist.textContent = data[i].waist;

        const hip = document.createElement("div");
        hip.textContent = data[i].hip;

        const arm = document.createElement("div");
        arm.textContent = data[i].arm;

        const price = document.createElement("div");
        price.textContent = data[i].price + " ฿";

        const status = document.createElement("div");
        status.className = "status " + data[i].status;
        status.textContent = data[i].status;

        const billId = document.createElement("div");
        billId.textContent = "#" + data[i].Bill_ID;

        row.appendChild(name);
        row.appendChild(faculty);
        row.appendChild(waist);
        row.appendChild(hip);
        row.appendChild(arm);
        row.appendChild(price);
        row.appendChild(status);
        row.appendChild(billId);

        table.appendChild(row);
    }
  });