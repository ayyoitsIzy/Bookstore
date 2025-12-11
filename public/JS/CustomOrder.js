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

function apply(){
    const dept = document.getElementById("department").value;
    const name = document.getElementById("name").value;
    const breast = parseInt(document.getElementById("breast").value);
    const waist = parseInt(document.getElementById("waist").value);
    const arm = parseInt(document.getElementById("arm").value);
    console.log(dept);
    console.log(name);
    console.log(breast);
    console.log(waist);
    console.log(arm);
    fetch("/basket/add_custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({
            prod_name : name+dept,
            name,dept,breast,waist,arm
        })
    })
}
