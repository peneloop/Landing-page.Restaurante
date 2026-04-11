// ================= NAV LINK ATIVO =================
const secs = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let cur = "";

  secs.forEach(sec => {
    const top = window.scrollY;
    const off = sec.offsetTop - 100;
    const h = sec.offsetHeight;

    if (top >= off && top < off + h) {
      cur = sec.id;
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + cur) {
      link.classList.add("active");
    }
  });
});


// ================= ANIMAÇÃO AO SCROLL =================
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("show");
    }
  });
});

document.querySelectorAll("section").forEach(sec => {
  sec.classList.add("hidden");
  obs.observe(sec);
});


// ================= BOTÃO VOLTAR AO TOPO =================
const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.className = "top-btn";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ================= EFEITO HOVER NOS CARDS =================
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(192,132,252,0.2), #111118)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#111118";
  });
});


// ================= MENU MOBILE =================
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}


// ================= EFEITO DIGITANDO =================
const title = document.querySelector(".apresenttxt h1");

if (title) {
  const txt = title.innerText;
  title.innerText = "";

  let i = 0;

  function type() {
    if (i < txt.length) {
      title.innerText += txt.charAt(i);
      i++;
      setTimeout(type, 70);
    }
  }

  type();
}