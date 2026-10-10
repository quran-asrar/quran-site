// ===========// =========================
// =========================
// اعمال تنظیمات سایت
// =========================

if (typeof SITE_CONFIG !== "undefined") {
    const siteName = document.getElementById("siteName");
    const siteNameHero = document.getElementById("siteNameHero");
    const siteNameFooter = document.getElementById("siteNameFooter");
    const siteFooter = document.getElementById("siteFooter");

    if (siteName) siteName.textContent = SITE_CONFIG.name;
    if (siteNameHero) siteNameHero.textContent = SITE_CONFIG.name;
    if (siteNameFooter) siteNameFooter.textContent = SITE_CONFIG.name;
    if (siteFooter) siteFooter.textContent = SITE_CONFIG.footer;

    if (SITE_CONFIG.heroImage) {
        const hero = document.querySelector(".hero");
        if (hero) {
            hero.style.backgroundImage = `url("${SITE_CONFIG.heroImage}")`;
            hero.style.backgroundSize = "cover";
            hero.style.backgroundPosition = "center";
            hero.style.backgroundRepeat = "no-repeat";
            hero.style.minHeight = "620px";
        }
    }
}


// =========================
// Elements (فرم‌های ورود و ثبت‌نام)
// =========================

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");


// =========================
// نمایش فرم‌ها
// =========================

function showRegister() {
    if (!loginTab || !registerTab || !loginForm || !registerForm) return;
    loginTab.classList.remove("active");
    registerTab.classList.add("active");
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
}

function showLogin() {
    if (!loginTab || !registerTab || !loginForm || !registerForm) return;
    registerTab.classList.remove("active");
    loginTab.classList.add("active");
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
}

if (loginTab) loginTab.addEventListener("click", showLogin);
if (registerTab) registerTab.addEventListener("click", showRegister);
if (goRegister) goRegister.addEventListener("click", showRegister);
if (goLogin) goLogin.addEventListener("click", showLogin);


// =========================
// فرم ورود
// =========================

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (email === "" || password === "") { alert("لطفاً همه قسمت‌ها را پر کنید."); return; }
        if (password.length < 8) { alert("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }

        localStorage.setItem("userEmail", email);
        alert("ورود با موفقیت انجام شد 🌿");
        window.location.href = "home.html";
    });
}


// =========================
// فرم ثبت نام
// =========================

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const phone = document.getElementById("registerPhone").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const terms = document.getElementById("terms").checked;

        if (name === "") { alert("لطفاً نام خود را وارد کنید."); return; }
        if (email === "") { alert("لطفاً ایمیل خود را وارد کنید."); return; }
        if (phone === "") { alert("لطفاً شماره موبایل خود را وارد کنید."); return; }
        if (password.length < 8) { alert("رمز عبور باید حداقل ۸ کاراکتر باشد."); return; }
        if (password !== confirmPassword) { alert("رمزهای عبور یکسان نیستند."); return; }
        if (!terms) { alert("لطفاً قوانین سایت را بپذیرید."); return; }

        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPhone", phone);

        alert("حساب کاربری با موفقیت ساخته شد 🌱");
        window.location.href = "home.html";
    });
}


// =========================
// ساخت کارت‌های دوره
// =========================

const coursesContainer = document.getElementById("coursesContainer");

if (coursesContainer && typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.courses) {
    SITE_CONFIG.courses.forEach(function(course) {

        const card = document.createElement("div");
        card.className = "course-card";

        card.innerHTML = `
            <div class="course-icon" style="background:${course.color}20; color:${course.color};">
                ${course.icon}
            </div>
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <div class="course-price">${course.price}</div>
            <button class="course-btn" ${course.comingSoon ? 'disabled' : ''}>
                ${course.comingSoon ? 'به زودی' : 'خرید دوره'}
            </button>
        `;

        coursesContainer.appendChild(card);
    });
}


// =========================
// نمایش و ویرایش پروفایل
// =========================

document.addEventListener("DOMContentLoaded", function() {

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profilePhone = document.getElementById("profilePhone");

    const profileView = document.getElementById("profileView");
    const profileEditForm = document.getElementById("profileEditForm");

    const editProfileBtn = document.getElementById("editProfileBtn");
    const saveProfileBtn = document.getElementById("saveProfileBtn");
    const cancelEditBtn = document.getElementById("cancelEditBtn");

    const editName = document.getElementById("editName");
    const editEmail = document.getElementById("editEmail");
    const editPhone = document.getElementById("editPhone");
    const editBirthday = document.getElementById("editBirthday");


    function loadProfile() {
        const name = localStorage.getItem("userName") || "کاربر";
        const email = localStorage.getItem("userEmail") || "-";
        const phone = localStorage.getItem("userPhone") || "-";

        if (profileName) profileName.textContent = "سلام، " + name + " 👋";
        if (profileEmail) profileEmail.textContent = email;
        if (profilePhone) profilePhone.textContent = phone;
    }

    loadProfile();


    if (editProfileBtn) {
        editProfileBtn.addEventListener("click", function() {
            if (editName) editName.value = localStorage.getItem("userName") || "";
            if (editEmail) editEmail.value = localStorage.getItem("userEmail") || "";
            if (editPhone) editPhone.value = localStorage.getItem("userPhone") || "";
            if (editBirthday) editBirthday.value = localStorage.getItem("userBirthday") || "";

            if (profileView) profileView.classList.add("hidden");
            if (profileEditForm) profileEditForm.classList.remove("hidden");
        });
    }


    if (saveProfileBtn) {
        saveProfileBtn.addEventListener("click", function() {
            const newName = editName.value.trim();
            const newEmail = editEmail.value.trim();
            const newPhone = editPhone.value.trim();
            const newBirthday = editBirthday.value.trim();

            if (newName === "") { alert("لطفاً نام خود را وارد کنید."); return; }
            if (newEmail === "") { alert("لطفاً ایمیل خود را وارد کنید."); return; }
            if (newPhone === "") { alert("لطفاً شماره موبایل خود را وارد کنید."); return; }

            localStorage.setItem("userName", newName);
            localStorage.setItem("userEmail", newEmail);
            localStorage.setItem("userPhone", newPhone);
            localStorage.setItem("userBirthday", newBirthday);

            alert("اطلاعات با موفقیت ذخیره شد ✅");

            loadProfile();

            if (profileEditForm) profileEditForm.classList.add("hidden");
            if (profileView) profileView.classList.remove("hidden");
        });
    }


    if (cancelEditBtn) {
        cancelEditBtn.addEventListener("click", function() {
            if (profileEditForm) profileEditForm.classList.add("hidden");
            if (profileView) profileView.classList.remove("hidden");
        });
    }

});