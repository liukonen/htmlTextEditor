function toggleTheme() {
  const root = document.documentElement
  const next = root.dataset.theme === "dark" ? "light" : "dark"
  root.dataset.theme = next
  root.dataset.bsTheme = next
  localStorage.setItem("theme", next)
}

// Sync theme on load
function initTheme() {
  const saved = localStorage.getItem("theme")
  if (saved) {
    document.documentElement.dataset.theme = saved
    document.documentElement.dataset.bsTheme = saved
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

const getLines = () => textbox.value.split('\n')

const updateLines = callback => {
  textbox.value = getLines()
    .map(callback)
    .join('\n')

  keyUp(textbox)
}

const firstIndex = (line, value) =>
  line.indexOf(value)

const lastIndex = (line, value) =>
  line.lastIndexOf(value)

const removeLeft = (line, index, value) =>
  index === -1
    ? line
    : line.slice(index + value.length)

const removeRight = (line, index) =>
  index === -1
    ? line
    : line.slice(0, index)

const FirstLeft = () => {
  const value = toolbar1.value
  if (!value) return

  updateLines(line =>
    removeLeft(
      line,
      firstIndex(line, value),
      value
    )
  )
}

const FirstRight = () => {
  const value = toolbar1.value
  if (!value) return

  updateLines(line =>
    removeRight(
      line,
      firstIndex(line, value)
    )
  )
}

const LastLeft = () => {
  const value = toolbar1.value
  if (!value) return

  updateLines(line =>
    removeLeft(
      line,
      lastIndex(line, value),
      value
    )
  )
}

const LastRight = () => {
  const value = toolbar1.value
  if (!value) return

  updateLines(line =>
    removeRight(
      line,
      lastIndex(line, value)
    )
  )
}


document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]")
  if (!el) return
  const fn = window[el.dataset.action]
  if (typeof fn !== "function") return
  fn(el.dataset.arg)
})