const $ = id => document.getElementById(id)

// THEME
function toggleTheme() {
  const root = document.documentElement
  const next = root.dataset.theme === "dark" ? "light" : "dark"
  root.dataset.theme = next
  localStorage.setItem("theme", next)
}

(function initTheme() {
  const saved = localStorage.getItem("theme")
  if (saved) document.documentElement.dataset.theme = saved
})()

// MAIN TEXT
const main = () => $("TextBox1")

// INSERT
function insertBefore() {
  main().value = $("TextBox2").value + main().value
}

function insertAfter() {
  main().value = main().value + $("TextBox2").value
}

// REPLACE
function replaceText() {
  const input = $("TextBox3").value.split("|")
  const find = input[0]
  const replace = input[1] || ""
  main().value = main().value.split(find).join(replace)
}

// CLEAN TOOLS
function clearAll() {
  main().value = ""
}

// BASIC TOOLS
function singleLine() {
  main().value = main().value.replace(/\n/g, " ")
}

function distinctList() {
  main().value = [...new Set(main().value.split("\n"))].join("\n")
}

function sortList() {
  main().value = main().value.split("\n").sort().join("\n")
}

function toUpper() {
  main().value = main().value.toUpperCase()
}

function toLower() {
  main().value = main().value.toLowerCase()
}

function duplicateLines() {
  main().value = main().value + "\n" + main().value
}

function trimAll() {
  main().value = main().value.trim()
}

function base64Encode() {
  main().value = btoa(main().value)
}

function base64Decode() {
  try {
    main().value = atob(main().value)
  } catch {}
}

// MODAL
function openAbout() {
  $("aboutModal").classList.add("open")
}

function closeAbout() {
  $("aboutModal").classList.remove("open")
}

// FILE (basic)
function openFile() {
  $("fileInput").click()
}

$("fileInput").addEventListener("change", e => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => main().value = reader.result
  reader.readAsText(file)
})

function saveFile() {
  const blob = new Blob([main().value], { type: "text/plain" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = "file.txt"
  a.click()
}