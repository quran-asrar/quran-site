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
// ساخت دکمه‌های کتاب
// =========================

const booksNav = document.getElementById("booksNav");
const surahList = document.getElementById("surahList");
const surahVideos = document.getElementById("surahVideos");

if (booksNav && typeof SITE_CONFIG !== "undefined" && SITE_CONFIG.books) {
    SITE_CONFIG.books.forEach(function(book, bookIndex) {
        const btn = document.createElement("button");
        btn.className = "book-btn";
        btn.textContent = book.name;
        btn.style.background = book.color;
        btn.style.color = "white";

        btn.addEventListener("click", function() { showBook(bookIndex); });
        booksNav.appendChild(btn);
    });

    showBook(0);
}


// =========================
// نمایش سوره‌های یک کتاب
// =========================

function showBook(bookIndex) {
    if (!surahList || !surahVideos) return;

    surahList.innerHTML = "";
    surahVideos.innerHTML = "";

    document.querySelectorAll(".book-btn").forEach(function(b) {
        b.classList.remove("active");
    });
    const btns = document.querySelectorAll(".book-btn");
    if (btns[bookIndex]) btns[bookIndex].classList.add("active");

    const book = SITE_CONFIG.books[bookIndex];

    book.surahs.forEach(function(surah, surahIndex) {
        const btn = document.createElement("button");
        btn.className = "surah-btn";
        btn.textContent = surah.name;

        if (surah.comingSoon) {
            btn.style.opacity = "0.6";
            btn.style.borderStyle = "dashed";
        }

        btn.addEventListener("click", function() {
            showSurah(bookIndex, surahIndex);
        });

        surahList.appendChild(btn);
    });
}


// =========================
// نمایش ویدیوهای یک سوره
// =========================

function showSurah(bookIndex, surahIndex) {
    if (!surahVideos) return;

    surahVideos.innerHTML = "";

    const surah = SITE_CONFIG.books[bookIndex].surahs[surahIndex];

    const title = document.createElement("h3");
    title.textContent = surah.name;
    title.style.marginTop = "30px";
    title.style.marginBottom = "20px";
    title.style.color = "#123c32";
    surahVideos.appendChild(title);

    if (surah.comingSoon) {
        const msg = document.createElement("p");
        msg.textContent = "🎬 ویدیوهای این سوره به زودی اضافه می‌شود.";
        msg.style.textAlign = "center";
        msg.style.color = "#777";
        msg.style.fontSize = "16px";
        msg.style.padding = "30px";
        msg.style.background = "#f5f7f5";
        msg.style.borderRadius = "12px";
        surahVideos.appendChild(msg);
        return;
    }

    if (surah.parts && surah.parts.length > 0) {
        const partsNav = document.createElement("div");
        partsNav.className = "parts-nav";

        surah.parts.forEach(function(part, partIndex) {
            const btn = document.createElement("button");
            btn.className = "part-btn";
            btn.textContent = part.title;

            btn.addEventListener("click", function() { showPart(partIndex); });
            partsNav.appendChild(btn);
        });

        surahVideos.appendChild(partsNav);
        showPart(0);

    } else if (surah.videos) {
        renderVideos(surah.videos);
    }


    function showPart(partIndex) {
        document.querySelectorAll(".part-btn").forEach(function(b) {
            b.classList.remove("active");
        });
        const pbtns = document.querySelectorAll(".part-btn");
        if (pbtns[partIndex]) pbtns[partIndex].classList.add("active");

        const oldContainer = document.querySelector(".current-videos");
        if (oldContainer) oldContainer.remove();

        renderVideos(surah.parts[partIndex].videos);
    }


    function renderVideos(videos) {
        const container = document.createElement("div");
        container.className = "cards-container current-videos";

        videos.forEach(function(video) {
            const card = document.createElement("div");
            card.className = "video-card";

            card.innerHTML = `
                <div class="video-placeholder">▶</div>
                <div class="video-content">
                    <h3>${video.title}</h3>
                    <button class="video-btn" data-video="${video.src}">
                        مشاهده ویدیو
                    </button>
                </div>
            `;

            container.appendChild(card);
        });

        surahVideos.appendChild(container);
    }
}


// =========================
// پخش ویدیو (آپارات)
// =========================

const videoModal = document.getElementById("videoModal");
const videoClose = document.getElementById("videoClose");

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("video-btn")) {
        const videoSrc = event.target.getAttribute("data-video");

        if (videoSrc && videoModal) {
            const modalContent = videoModal.querySelector(".video-modal-content");

            const oldIframe = modalContent.querySelector("iframe");
            const oldLoading = modalContent.querySelector(".video-loading");
            if (oldIframe) oldIframe.remove();
            if (oldLoading) oldLoading.remove();

            const loading = document.createElement("p");
            loading.className = "video-loading";
            loading.textContent = "⏳ در حال بارگذاری ویدیو...";
            loading.style.color = "white";
            loading.style.textAlign = "center";
            loading.style.padding = "30px";
            loading.style.fontSize = "16px";
            modalContent.appendChild(loading);

            const iframe = document.createElement("iframe");
            iframe.src = "https://www.aparat.com/video/video/embed/videohash/" + videoSrc + "/vt/frame";
            iframe.style.width = "100%";
            iframe.style.height = "450px";
            iframe.style.border = "none";
            iframe.style.borderRadius = "10px";
            iframe.setAttribute("allowfullscreen", "true");

            iframe.addEventListener("load", function() {
                const loadingMsg = modalContent.querySelector(".video-loading");
                if (loadingMsg) loadingMsg.remove();
            });

            modalContent.appendChild(iframe);
            videoModal.style.display = "flex";
        }
    }
});

if (videoClose) {
    videoClose.addEventListener("click", function() {
        const modalContent = videoModal.querySelector(".video-modal-content");
        const iframe = modalContent.querySelector("iframe");
        const loading = modalContent.querySelector(".video-loading");
        if (iframe) iframe.remove();
        if (loading) loading.remove();
        videoModal.style.display = "none";
    });
}

if (videoModal) {
    videoModal.addEventListener("click", function(event) {
        if (event.target === videoModal) {
            const modalContent = videoModal.querySelector(".video-modal-content");
            const iframe = modalContent.querySelector("iframe");
            const loading = modalContent.querySelector(".video-loading");
            if (iframe) iframe.remove();
            if (loading) loading.remove();
            videoModal.style.display = "none";
        }
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


    // نمایش اطلاعات کاربر
    function loadProfile() {
        const name = localStorage.getItem("userName") || "کاربر";
        const email = localStorage.getItem("userEmail") || "-";
        const phone = localStorage.getItem("userPhone") || "-";

        if (profileName) profileName.textContent = "سلام، " + name + " 👋";
        if (profileEmail) profileEmail.textContent = email;
        if (profilePhone) profilePhone.textContent = phone;
    }

    loadProfile();


    // باز کردن فرم ویرایش
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


    // ذخیره تغییرات
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


    // دکمه برگشت
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener("click", function() {
            if (profileEditForm) profileEditForm.classList.add("hidden");
            if (profileView) profileView.classList.remove("hidden");
        });
    }

});