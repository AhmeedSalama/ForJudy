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
            
            // فقط حساب المهام داخل الملاحظات
            updateNoteCounts();

            // حفظ التحديثات في localStorage
            saveNotes();
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

        // تحديث العد للملاحظات فقط
        updateNoteCounts();

        // حفظ التحديث في LocalStorage بعد إضافة الملاحظة
        saveNotes();
    }
};

// دالة لتحديث العد داخل قسم الملاحظات
function updateNoteCounts() {
    let countAllTasks = document.querySelectorAll(".resultForNote .taskNotee").length;
    AllTasks.textContent = `ALL ${countAllTasks}`;
    
    let countTasks = document.querySelectorAll(".resultForNote .taskNotee.donetask").length;
    DoneAll.textContent = `Done ${countTasks}`;
}

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
    updateNoteCounts();
};
let butnfuny = document.querySelector(".funny-button"); 
let h1 = document.querySelector(".resultfunny h1");
let resultfunny = document.querySelector(".resultfunny"); 
let list = [
    "اضحك بصوت عالٍ لمدة 15 ثانية، حتى لو لم يكن هناك شيء مضحك. 😂",
    "اجعل أحد أفراد العائلة يعتقد أنك تدربت على رقصة جديدة، وقم بأداء 'رقص' عشوائي لمدة دقيقة. 💃🕺",
    "امشِ كما لو كنت في عرض أزياء لمدة 3 دقائق. 👠💁‍♀️",
    "اقفز على قدم واحدة 10 مرات كأنك تحاول التدريب للأولمبياد. 🏅🤸‍♀️",
    "تحدث بصوت منخفض لمدة 3 دقائق، وكأنك أحد الشخصيات في فيلم رعب. 🎃👻",
    "حاول أن تضحك مثل شخصية كرتونية مشهورة. 🤣🎥",
    "مارس تمارين رياضية غريبة مثل 'الضغط' ولكن مع تبديل الحركات بشكل عشوائي. 🤪💪",
    "اختار أغنية وقم بأدائها وكأنك في مسرح موسيقي (حتى لو كانت أغنية غريبة). 🎤🎶",
    "امسك كتابًا وقم بتمثيل مشهد من الفيلم بشكل مبالغ فيه. 🎬📖",
    "حاول أن تتوازن على ساق واحدة لمدة 3 دقائق بدون أن تسقط. 🏄‍♀️🤸‍♂️",
    "شاهد فيديو يوتيوب عشوائي وحاول تقليد الحركات التي تراها على الشاشة ولكن بدون أن تتحرك من مكانك. 📱😂",
    "قم بتنظيف طاولة أو سطح أمامك ولكن بشكل مبالغ فيه وكأنك تقوم بتنظيف مسرح ضخم. 🧼🧽",
    "قف وأنت تحاول الوصول إلى شيء بعيد في الغرفة باستخدام أطراف أصابعك فقط، كأنك تستعرض مهاراتك في التوازن. 🤹‍♀️👀",
    "ابتسم لنفسك في المرآة ولكن كأنك تبتسم لأفضل صديق لك لمدة دقيقة، دون أن تتحرك من مكانك. 😊💖",
    "اجعل الأمور تبدو أكثر مرحًا من خلال جعل إحدى يديك تتحرك كما لو كانت تروي قصة أثناء التحدث. 👐📚",
    "قف وكأنك في عرض سيرك وحاول أن توازن نفسك كأكروباتية، دون أن تسقط طبعًا! 🎪🤹‍♂️",
    "خذ وضعية 'الاسترخاء' على الأريكة ولكن بشكل مبالغ فيه وكأنك تجلس في حفلة شاي ملكية. 🍵👑",
    "اعمل مشهدًا دراميًا طويلًا (صوتيًا فقط) وأنت جالس، دون أن تحرك سوى يديك أو وجهك. 🎭🤩",
    "شاهد فيديو فكاهي وحاول أن تضحك بأكبر قدر ممكن من التعبير، مع الحفاظ على راحتك. 😆💺",
    "اجلس على كرسي وامسك بمروحة يدوية، ثم قم بتوجيهها وكأنك ملكة/ملك يحكم مملكته. 👑🌀",
    "قف قليلاً وحاول أن تجعل وجهك يعبر عن جميع المشاعر الممكنة (الحزن، السعادة، المفاجأة) دون تحريك جسمك. 😲😊😱",
    "امسك قلادة أو شيء صغير آخر، وحاول أن تحركه في الهواء وكأنك قائد أوركسترا. 🎻🎶",
    "قم بمهمتك اليومية ولكن تخيل أنك في برنامج طبخ وتصف كل خطوة بصوت عالٍ كما لو كنت تُقدم برنامجًا تلفزيونيًا. 🍳📺",
    "عند مشاهدة شيء طريف، قم بتصفيف ولكن بشكل غير متوقع (مثلاً بعد 10 ثوانٍ من اللحظة المضحكة). 🤭👏",
    "حاول أن تبتسم ثم تضحك ثم تتوقف بشكل مفاجئ ثلاث مرات متتالية وكأنك في مشهد كوميدي. 🤣😂😅",
    "شاهد فيديو عن أشياء غريبة وحاول أن تشرحها لأصدقائك وكأنك خبير في الموضوع. 🧐📚",
    "قف أمام المرآة وحاول أن تكون محاكيًا لعارض أزياء في عرض عالمي، مع خطوات مبالغ فيها. 💃🕺",
    "افتح نافذة وتحدث إلى الهواء كما لو كان صديقك المفضل، وتحدث معه لمدة 3 دقائق. 🌬️🤔",
    "امشِ في الغرفة وأنت تتصرف كأنك شخصية من أفلام الخيال العلمي. 🚀👽",
    "حاول أن تصل إلى أقصى ارتفاع ممكن بذراعيك فقط أثناء الجلوس على الكرسي. 🙆‍♀️🙆‍♂️",
    "افتح الخزانة وأغلقها عدة مرات كأنك تحاول العثور على شيء مفقود. 🚪🔍",
    "تحدث إلى النباتات أو الحيوانات (إن وجدت) وكأنهم شخصيات في فيلم. 🌱🐶",
    "اجعل أي شيء في الغرفة يبدو وكأنه كنز ثمين، وقم بالتحدث عنه وكأنك في فيلم مغامرات. 💎🗺️",
    "قم بإعداد وجبة بسيطة ثم صور نفسك كأنك طاهٍ في برنامج طبخ مشهور. 🍲🍴",
    "اجعل شخصًا آخر يعتقد أنك عالم مجنون من خلال الحديث عن 'نظرية جديدة' لأشياء عادية. 🧑‍🔬💥",
    "اعطِ تعليمات غريبة لزملائك في المنزل، مثل: 'الآن يجب أن نمشي كما لو كنا طيورًا'. 🦅🚶‍♀️"
  ];
  




butnfuny.onclick = function () {
    let randomIndex = Math.floor(Math.random() * list.length);  
    let randomElement = list[randomIndex]; 

    
    h1.textContent = randomElement;  
    resultfunny.appendChild(h1);  
};
