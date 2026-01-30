// Welcome
function showWelcomeMessage() {
  const welcomeMessage = document.getElementById("welcomeMessage");

  let userName = localStorage.getItem("userName");

  if (!userName) {
    userName = prompt("Hello! What's your name?");

    if (userName && userName.trim() !== "") {
      userName = userName.trim();
      localStorage.setItem("userName", userName);
    } else {
      userName = "Guest";
      localStorage.setItem("userName", userName);
    }
  }

  if (userName === "Guest") {
    welcomeMessage.textContent = `Hi ${userName}, Welcome to Revalno Website!`;
  } else {
    welcomeMessage.textContent = `Hi ${userName}, Welcome Back to Revalno Website!`;
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const buttons = document.querySelectorAll("button[data-section]");
  const footerLinks = document.querySelectorAll(".footer-links a");

  function switchSection(targetSectionId) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const currentActive = document.querySelector(".section.active");
    if (currentActive) {
      currentActive.classList.remove("active");
    }

    setTimeout(() => {
      navLinks.forEach((l) => l.classList.remove("active"));

      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.classList.add("active");

        if (targetSectionId === "home") {
          targetSection.offsetHeight;

          showWelcomeMessage();
        }
      }

      navLinks.forEach((l) => {
        if (l.getAttribute("data-section") === targetSectionId) {
          l.classList.add("active");
        }
      });
    }, 400);
  }

  // Navbar link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("data-section");
      switchSection(targetSection);
    });
  });

  // Buttonsssss
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("data-section");
      switchSection(targetSection);
    });
  });

  footerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute("data-section");
      switchSection(targetSection);
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("messageForm");
  const tableBody = document.getElementById("tableBody");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    const gender =
      document.querySelector('input[name="gender"]:checked')?.value || "";

    const message = document.getElementById("message").value.trim();

    if (!name || !email || !gender || !message) {
      showPopup("⚠️ Tolong Diisi Semua Field!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showPopup("⚠️ Format email tidak valid!");
      return;
    }

    const newRow = document.createElement("tr");

    const formattedMessage =
      message.length > 50 ? message.substring(0, 50) + "..." : message;

    newRow.innerHTML = `
      <td>${escapeHtml(name)}</td>
      <td>${escapeHtml(email)}</td>
      <td>${escapeHtml(gender)}</td>
      <td>${escapeHtml(formattedMessage)}</td>
    `;

    // Add fade-in animation
    newRow.style.opacity = "0";
    newRow.style.transform = "translateY(20px)";
    tableBody.prepend(newRow);

    setTimeout(() => {
      newRow.style.transition = "all 0.5s ease";
      newRow.style.opacity = "1";
      newRow.style.transform = "translateY(0)";
    }, 10);

    // Success popup
    showPopup("✅ Pesan berhasil terkirim!");

    // Reset form
    form.reset();

    setTimeout(() => {
      document.querySelector(".contact-table").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  });
}

// Popup Notification
function showPopup(message) {
  const existingPopup = document.querySelector(".popup");
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }

  // popup element
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `<p>${message}</p>`;

  // Style popup
  popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${message.includes("✅") ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: popupSlide 0.3s ease;
        font-weight: 600;
    `;

  document.body.appendChild(popup);

  // Hapus Setelah 3 detik
  setTimeout(() => {
    popup.style.animation = "popupSlideOut 0.3s ease";
    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// page load
document.addEventListener("DOMContentLoaded", function () {
  showWelcomeMessage();
  setupNavigation();
  setupContactForm();
});
