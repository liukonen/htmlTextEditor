document.addEventListener("DOMContentLoaded", () => {
  const adjustLayout = () => {
    let windowWidth = window.innerWidth
    let buttonGroup = document.getElementById('button-group')
    if (windowWidth >= 770) {
      buttonGroup.classList.add('btn-group-vertical')
    } else {
      buttonGroup.classList.remove('btn-group-vertical')
    }
  }

  const darkThemeMq = this.matchMedia("(prefers-color-scheme: dark)")
  let currentTheme = localStorage.getItem("theme")
  if (!currentTheme && darkThemeMq.matches) { currentTheme = "dark" }
  if (currentTheme) {
    document.documentElement.dataset.bsTheme = currentTheme
  }
  adjustLayout()
  window.addEventListener('resize', () => { adjustLayout() })
})

const getLists = () => {
  const Lines = toList(textbox.value)
  const list1 = []
  const list2 = []
  let HasHit = false
  for (const line of Lines) {
    if (line == '') {
      HasHit = true // skip over all empty lines
    } else if (HasHit) {
      list2.push(line)
    } else {
      list1.push(line)
    }
  }
  return { L1: list1, L2: list2 }
}

let tooltipTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))