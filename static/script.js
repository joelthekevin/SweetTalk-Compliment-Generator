// ✅ Service Worker Registration (Offline Support)
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/static/service-worker.js");
}

// ✅ Generate Compliment Function
function generateCompliment() {
    const name = document.getElementById("name").value.trim();
    const tone = document.getElementById("tone").value;
    const mood = document.getElementById("mood").value;

    // ✅ Validation: must select tone & mood
    if (tone === "") {
        alert("⚠️ Please select a Tone before generating a compliment.");
        return;
    }

    if (mood === "") {
        alert("⚠️ Please select your Mood before generating a compliment.");
        return;
    }

    fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tone, mood })
    })
        .then(response => response.json())
        .then(data => openModal(data.compliment))
        .catch(error => {
            console.error(error);
            openModal("⚠️ Something went wrong. Please try again!");
        });
}

// ✅ Open Modal
function openModal(message) {
    document.getElementById("modalText").innerText = message;
    document.getElementById("complimentModal").style.display = "block";
    document.getElementById("mainContent").classList.add("blur");

    // 🎉 Confetti
    startConfetti();
}

// ✅ Close Modal
function closeModal() {
    document.getElementById("complimentModal").style.display = "none";
    document.getElementById("mainContent").classList.remove("blur");

    // 🎉 Stop Confetti
    stopConfetti();
}

// ✅ Confetti Logic
let confettiInterval;

function startConfetti() {
    stopConfetti(); // prevents stacking

    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");

    canvas.style.display = "block";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 150;
    const confettiPieces = [];

    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 3,
            d: Math.random() * confettiCount,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncrement: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < confettiPieces.length; i++) {
            const c = confettiPieces[i];
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 60%)`;
            ctx.moveTo(c.x + c.tilt + c.r, c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            ctx.stroke();
        }

        updateConfetti();
    }

    function updateConfetti() {
        for (let i = 0; i < confettiPieces.length; i++) {
            const c = confettiPieces[i];
            c.tiltAngle += c.tiltAngleIncrement;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.x += Math.sin(c.d);
            c.tilt = Math.sin(c.tiltAngle) * 15;

            if (c.y > canvas.height) {
                c.y = -10;
                c.x = Math.random() * canvas.width;
            }
        }
    }

    confettiInterval = setInterval(drawConfetti, 20);
}

function stopConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    canvas.style.display = "none";
    clearInterval(confettiInterval);
}

// ✅ After DOM Loaded: Attach all events
document.addEventListener("DOMContentLoaded", function () {

    // Auto Year
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.innerText = new Date().getFullYear();

    // Generate Button
    const generateBtn = document.getElementById("generateBtn");
    if (generateBtn) generateBtn.addEventListener("click", generateCompliment);

    // Modal close buttons
    const closeBtn = document.getElementById("closeModalBtn");
    const closeBtn2 = document.getElementById("closeModalBtn2");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeBtn2) closeBtn2.addEventListener("click", closeModal);

    // Close modal by clicking outside
    const modal = document.getElementById("complimentModal");
    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) closeModal();
        });
    }

    // Close modal on ESC
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeModal();
    });

    // ✅ Back to top click
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ✅ Fade-in animation using IntersectionObserver
    const sections = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
});

// ✅ Scroll progress + Back-to-top show/hide
window.addEventListener("scroll", () => {
    const scrollProgress = document.getElementById("scrollProgress");
    const backToTopBtn = document.getElementById("backToTop");

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (scrollProgress) scrollProgress.style.width = scrollPercent + "%";

    if (backToTopBtn) {
        backToTopBtn.style.display = scrollTop > 250 ? "block" : "none";
    }
});
