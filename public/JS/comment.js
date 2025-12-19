fetch("/comment/users_order")
  .then(res => res.json())
  .then(data => {
    const result = Object.values(
    data.reduce((acc, item) => {
        const billId = item.Bill_ID;

        if (!acc[billId]) {
        acc[billId] = {
            bill_id: billId,
            date: item.date,
            products: []
        };
        }

        acc[billId].products.push({
        name: item.name,
        Prod_ID : item.Prod_ID,
        });

        return acc;
    }, {})
    );
    console.log(result);
    const billSelect = document.querySelector(".card-meta select");

    result.forEach(bill => {
    const opt = document.createElement("option");
    opt.value = bill.bill_id;
    console.log(bill.date);
    const date = new Date(bill.date);
    const readable = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
        }).format(date);
    opt.textContent = `Bill #${bill.bill_id} {`+readable+"} ";
    billSelect.appendChild(opt);
    });

    const productSelect = document.getElementById("prod");

    billSelect.addEventListener("change", () => {
    const billId = Number(billSelect.value);


    productSelect.innerHTML = "";

    const bill = result.find(b => b.bill_id === billId);
    if (!bill) return;

    bill.products.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.Prod_ID;
        opt.textContent = p.name;
        productSelect.appendChild(opt);
    });
    });


  document.getElementsByClassName("btn")[0].addEventListener("click",async ()=>{
    const bill_ID = document.querySelector(".card-meta select").value;
    const prod_ID = document.getElementById("prod").value;
    const rate= document.getElementById("rate").value;
    const text = document.getElementById("text").value;
    let res = await fetch("/comment/post_comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({bill_ID,prod_ID,rate,text})
        });
    let status = await res.json();
    if (status.success) {
        alert("done");
        location.reload();
    } else {
        alert("error");
    }
    })
    

   
  });


