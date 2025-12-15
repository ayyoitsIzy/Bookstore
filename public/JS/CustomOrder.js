document.addEventListener("DOMContentLoaded", () => {
    const facultySelect = document.getElementById("faculty");
    const deptSelect = document.getElementById("department");

    const departmentOptions = {
        ENG: [
            { value: "MECHANICLE", text: "วิศวกรรมเครื่องกล" },
            { value: "CIVIL",      text: "วิศวกรรมโยธา" }
        ],
        SCI: [
            { value: "MTH", text: "คณิตศาสตร์" },
            { value: "PHY", text: "ฟิสิกส์" }
        ]
    };
    const setDepartmentOptions = (list) => {
        deptSelect.innerHTML = "";

        const first = document.createElement("option");
        first.value = "";
        first.disabled = true;
        first.selected = true;
        first.textContent = "เลือกภาควิชา";
        deptSelect.appendChild(first);
        if (!list) {
            deptSelect.disabled = true;
            return;
        }
        list.forEach(dep => {
            const opt = document.createElement("option");
            opt.value = dep.value;
            opt.textContent = dep.text;
            deptSelect.appendChild(opt);
        });
        deptSelect.disabled = false;
    };
    setDepartmentOptions(null);
    facultySelect.addEventListener("change", () => {
        setDepartmentOptions(departmentOptions[facultySelect.value] || null);
    });
});
function showProductMessage(message, type = "error") {
  const box = document.getElementById("product-message");
  if (!box) return;

  box.textContent = message || "";
  box.style.display = message ? "block" : "none";

  box.classList.remove("success");
  if (type === "success") box.classList.add("success");
}

async function apply() {
  const dept = document.getElementById("department").value;
  const name = document.getElementById("name").value;
  const breast = parseInt(document.getElementById("breast").value);
  const waist = parseInt(document.getElementById("waist").value);
  const arm = parseInt(document.getElementById("arm").value);

  const errorBox = document.getElementById("error-box");
  const errors = [];

  if (!dept) errors.push("กรุณาเลือกภาควิชา");
  if (!name || name.trim() === "") errors.push("กรุณากรอกชื่อ");
  if (Number.isNaN(breast)) errors.push("กรุณากรอกขนาดรอบอก");
  if (Number.isNaN(waist)) errors.push("กรุณากรอกขนาดเอว");
  if (Number.isNaN(arm)) errors.push("กรุณากรอกขนาดแขน");

  if (errors.length > 0) {
    errorBox.innerHTML = "<ul>" + errors.map(msg => `<li>${msg}</li>`).join("") + "</ul>";
    errorBox.style.display = "block";
    return;
  } else {
    errorBox.style.display = "none";
  }

  try {
    const res = await fetch("/basket/add_custom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        prod_name: name + dept,
        name, dept, breast, waist, arm
      })
    });

    if (!res.ok) {
      showProductMessage("เพิ่มสินค้าลงตะกร้าไม่สำเร็จ");
      return;
    }

    showProductMessage("เพิ่มสินค้าลงตะกร้าแล้ว", "success");
    console.log(document.getElementById("product-message").className);
  } catch (err) {
    console.log(err);
    showProductMessage("เพิ่มสินค้าลงตะกร้าไม่สำเร็จ");
  }
}
