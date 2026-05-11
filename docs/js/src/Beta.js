    function toggleTheme() {
      const root = document.documentElement
      const next = root.dataset.theme === "dark" ? "light" : "dark"
      root.dataset.theme = next
      root.setAttribute("data-bs-theme", next)
      localStorage.setItem("theme", next)
    }

    // Sync theme on load
    function initTheme() {
      const saved = localStorage.getItem("theme")
      if (saved) {
        document.documentElement.dataset.theme = saved
        document.documentElement.setAttribute("data-bs-theme", saved)
      }
    }

    // Initialize theme before app loads
    initTheme()

    // Override the btnSwitch onclick to use our toggleTheme
    document.addEventListener('DOMContentLoaded', () => {
      const btnSwitch = document.getElementById('btnSwitch')
      if (btnSwitch) {
        btnSwitch.onclick = toggleTheme
      }
    })



    document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;

  const fn = window[el.dataset.action];

  if (typeof fn !== "function") return;

  fn(el.dataset.arg);
});