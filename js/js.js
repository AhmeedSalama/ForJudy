let result = document.querySelector(".result");
let input = document.querySelector(".form input");
let dayInput = document.querySelector(".form .day-input");
let addbtn = document.querySelector(".add-btn");

addbtn.onclick = function () {
    if (input.value.trim() === '' || dayInput.value.trim() === '') {
        return; // لا تضف إذا كانت الحقول فارغة
    }

    // البحث عن اليوم في الصفحة
    let dayDiv = document.querySelector(`.day[data-day="${dayInput.value.trim()}"]`);
    if (!dayDiv) {
        // إنشاء يوم جديد
        dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.setAttribute("data-day", dayInput.value.trim());

        let dayTitle = document.createElement("h3");
        dayTitle.textContent = dayInput.value.trim();

        let deleteDayButton = document.createElement("button");
        deleteDayButton.className = "delete-day";
        deleteDayButton.textContent = "Remove Day";

        let dayHeader = document.createElement("div");
        dayHeader.className = "day-header";
        dayHeader.appendChild(dayTitle);
        dayHeader.appendChild(deleteDayButton);

        dayDiv.appendChild(dayHeader);
        result.appendChild(dayDiv);
    }

    // إنشاء المهمة
    let task = document.createElement("div");
    task.className = "task";
    task.textContent = input.value.trim();

    let btns = document.createElement("div");
    btns.className = "btns";

    let buttonDone = document.createElement("button");
    buttonDone.className = "done";
    buttonDone.innerHTML = '<i class="fa-solid fa-check"></i>';

    let buttonDelete = document.createElement("button");
    buttonDelete.className = "delete";
    buttonDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';

    btns.appendChild(buttonDone);
    btns.appendChild(buttonDelete);
    task.appendChild(btns);

    // إضافة المهمة إلى اليوم
    dayDiv.appendChild(task);

    // تنظيف حقول الإدخال
    input.value = '';
    dayInput.value = '';

    // حفظ التحديثات في LocalStorage
    saveNotes();
};

document.addEventListener("click", function (e) {
    // حذف اليوم
    if (e.target.classList.contains("delete-day")) {
        let dayDiv = e.target.closest(".day");
        if (dayDiv) {
            dayDiv.remove();
            saveNotes();  // حفظ التحديثات بعد حذف اليوم
        }
    }

    // حذف المهمة أو الملاحظة
    if (e.target.classList.contains("fa-trash") || e.target.closest(".delete")) {
        let taskOrNote = e.target.closest(".task, .resultForNote > div");
        if (taskOrNote) {
            taskOrNote.remove();
            saveNotes();  // حفظ التحديثات بعد حذف المهمة أو الملاحظة
        }
    }

    // إنهاء المهمة أو الملاحظة
    if (e.target.classList.contains("fa-check") || e.target.closest(".done")) {
        let taskOrNote = e.target.closest(".task, .resultForNote > div");
        if (taskOrNote) {
            taskOrNote.classList.toggle("donetask");
            let countTasks = document.querySelectorAll(".donetask").length;
            DoneAll.textContent = `Done ${countTasks}`;
            let countAllTasks = document.querySelectorAll(".resultForNote  .taskNotee").length;
            AllTasks.textContent = `ALL ${countAllTasks}`;
            // حفظ التحديثات في localStorage
            localStorage.setItem("countAllTasks", countAllTasks);
            localStorage.setItem("countTasks", countTasks);
            saveNotes();  // حفظ التحديثات بعد إتمام المهمة
        }
    }
});

let resultForNote = document.querySelector(".resultForNote");
let addNote = document.querySelector(".add-note");
let inbNote = document.querySelector(".inb-Note");

let DoneAll = document.querySelector(".doneall");
let AllTasks = document.querySelector(".all");

// إضافة ملاحظة
addNote.onclick = function () {
    if (inbNote.value === "") {
        return;
    } else {
        let note = document.createElement("div");
        note.classList = `taskNotee`;
        let texNote = document.createTextNode(inbNote.value);
        note.appendChild(texNote);
        
        // إضافة حاوية للأزرار
        let btnfornote = document.createElement("div");
        btnfornote.classList.add("btn-for-note");

        let btnd = document.createElement("button");
        btnd.classList.add("done");
        btnd.innerHTML = '<i class="fa-solid fa-check"></i>';

        let btndl = document.createElement("button");
        btndl.classList.add("delete");
        btndl.innerHTML = '<i class="fa-solid fa-trash"></i>';

        btnfornote.appendChild(btnd);
        btnfornote.appendChild(btndl);
        note.appendChild(btnfornote);
        resultForNote.appendChild(note);
        inbNote.value = "";

        // تحديث العد
        let countAllTasks = document.querySelectorAll(".resultForNote  .taskNotee").length;
        AllTasks.textContent = `ALL ${countAllTasks}`;

        // حفظ التحديث في LocalStorage بعد إضافة الملاحظة
        saveNotes();
    }
};

// دالة لحفظ الملاحظات والأيام في LocalStorage
function saveNotes() {
    localStorage.setItem("notes", resultForNote.innerHTML);
    localStorage.setItem("days", result.innerHTML);
}

// استرجاع الملاحظات والأيام عند تحميل الصفحة
window.onload = function() {
    // استرجاع الملاحظات المخزنة
    let savedNotes = localStorage.getItem("notes");
    let savedDays = localStorage.getItem("days");
    let savedCountTasks = localStorage.getItem("countTasks");
    let savedCountAllTasks = localStorage.getItem("countAllTasks");

    if (savedNotes) {
        resultForNote.innerHTML = savedNotes;
    }
    if (savedDays) {
        result.innerHTML = savedDays;
    }

    // إذا كان هناك عدد مخزن من المهام المنجزة، قم بتحديث النص
    if (savedCountTasks) {
        DoneAll.textContent = `Done ${savedCountTasks}`;
    }

    // حساب إجمالي المهام والملاحظات
    let countAllTasks = document.querySelectorAll(".resultForNote  .taskNotee").length;
    AllTasks.textContent = `ALL ${countAllTasks}`;
};
