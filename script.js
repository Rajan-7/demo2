const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");

    faqItems.forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });
  });
});

function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

let popupInterval;

window.addEventListener("load", () => {
  if (!localStorage.getItem("subscribe")) {
    popupInterval = setInterval(() => {
      showPopup();
    }, 10000);
  }
});

function hidePopup() {
  document.getElementById("popup").style.display = "none";
}

// Close button
document.getElementById("popup-close").addEventListener("click", hidePopup);

// Close when clicking outside popup box
document.getElementById("popup").addEventListener("click", (e) => {
  if (e.target.id === "popup") {
    hidePopup();
  }
});

// Data sending to backend
document
  .getElementById("subscribe-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    let response = await fetch(
      "https://globalapp-name-0d4885bd142a.herokuapp.com/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );
    if (response.ok) {
      alert("✅ Subscription successful!");
      document.getElementById("email").value = "";
      hidePopup();
      clearInterval(popupInterval);
      localStorage.setItem("subscribe", true);
    } else {
      alert("🔴 Error saving email");
    }
  });
