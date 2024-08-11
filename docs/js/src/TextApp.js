const textbox = document.getElementById('TextBox1')
const toolbar1 = document.getElementById('TextBox2')
const toolbar2 = document.getElementById('TextBox3')


const toList = (text) => text.split(/\n/)
const replaceText = (requestTextbox, value, replacementValue) => requestTextbox.value.replace(value, replacementValue) 
const distinct = (list) => Array.from(new Set(list))
const fromList = (listToJoin) => (listToJoin.length == 0 && listToJoin[0] == '') ? '' : listToJoin.join('\n')
const sort = (arrayItems) => arrayItems.sort()
const ListDisect = (transformFunction) => fromList(toList(textbox.value).map(item => transformFunction(item)))
const removePrefixXml =(xml) =>xml.replace(/<[A-Z]+:/g, "<").replace(/<\/[A-Z]+:/g, "</").replace(/[A-Z]+:nil/g, "nil").replace(/[A-Z]+:type/g, "type")
const removeXmlns = (xml) => xml.replace(/xmlns[^"]*"[^"]*"/g, "").replace(/\s+>/g, ">")

const debounce = (func, delay) => {
  let timeoutId
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(textbox), delay)
  }
}

const debouncedKeyUp = debounce(keyUp, 300)
textbox.addEventListener('input', debouncedKeyUp)

//EVENT HANDLES
const openDialog = () => document.getElementById("OpenFile").click()

const singleLine = () => {
  textbox.value = replaceText(textbox, /\n/g, '')
  keyUp(textbox)
}

const distinctList = () => {
  try {
    textbox.value = distinct(toList(textbox.value)).join('\n')
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

const sortList = () => {
  try {
    textbox.value = fromList(sort(toList(textbox.value)))
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

const toUpper = () => textbox.value = textbox.value.toUpperCase()
const toLower = () => textbox.value = textbox.value.toLowerCase()

const dupicateLines = () => { 
  textbox.value = ListDisect(item => item.toString() + item.toString())
  keyUp(textbox)
}

const trimText = (method) => {
  textbox.value = ListDisect(item => item[method]())
  keyUp(textbox)
}

const urlEncode = () => textbox.value = encodeURI(textbox.value)
const urlDecode = () => textbox.value = decodeURI(textbox.value)

const base64Decode = () => textbox.value = atob(textbox.value)
const base64Encode = () => textbox.value = btoa(textbox.value)

const removeXMLNamespace = () => {
  try {
    textbox.value = removeXmlns(removePrefixXml(textbox.value))
  } catch (err) {
    alert(err)
  }
}

const beautify = (type) => {
  try {
    textbox.value = vkbeautify[type](textbox.value)
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

const getDistintItemsFromLists = () => {
  const lists = extractLists();
  const distinct = getUniqueItemsFromArrays(lists);
  textbox.value = lists.map(list => fromList(list.filter(obj => distinct.includes(obj)))).join("\n\n");
  keyUp(textbox)
}

const getMatchingItemsFromLists = () => {
  const nonEmptyLists = extractLists();
  const commonStrings = nonEmptyLists.reduce((common, list) => list.filter(str => common.includes(str)), nonEmptyLists[0] || []);
  textbox.value = fromList(commonStrings)
  keyUp(textbox)
}

const speak = () => {
  const msg = new SpeechSynthesisUtterance()
  msg.text = textbox.value
  window.speechSynthesis.speak(msg)
}

//BOTTOM ROW

//SINGLE LINE ITEMS
const txtParse = () => {
  try {
    let tb2 = toolbar1.value
    if (tb2 != '') { textbox.value = parseText(textbox.value, tb2) }
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

const insertStart = () => {
  const toolbarText = toolbar1.value
  textbox.value = toolbarText + textbox.value.replace(/\n/g, '\n' + toolbarText)
  keyUp(textbox)
}

const insertEnd =() => {
  const toolbarText = toolbar1.value
  textbox.value = textbox.value.replace(/\n/g, toolbarText + '\n') + toolbarText
  keyUp(textbox)
}

//DOUBLE LINE ITEMS
const txtReplace = () => {
  try {
    textbox.value = textbox.value.replaceAll(toolbar1.value, toolbar2.value)
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

//INDIVIUAL ITEMS
const clearScreen =() => {
  [textbox.value, toolbar1.value, toolbar2.value] = ['', '', '']
  keyUp(textbox)
  sessionStorage.clear()
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(textbox.value).then(() => { alert("text copied to clipboard.") }).catch(err => { alert(err.message) })
}

const downloadFile = (extension) => {
  try {
    const content = textbox.value
    const downloadLink = document.createElement("a")
    const filename = "output_" + dateString() + "." + extension
    downloadLink.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    downloadLink.setAttribute("download", filename)
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  } catch (err) {
    alert(err.message)
  }
}

const saveToCache = () => {
  const ExistingStorage = readCache()
  ExistingStorage.push({ key: dateString(), value: textbox.value })
  localStorage.setItem('CachedItems', JSON.stringify(ExistingStorage))
  refreshCacheDropdown()
}

const clearCache = () => {
  localStorage.removeItem('CachedItems')
  refreshCacheDropdown()
}

const readItem = (s) => {
  const ExistingStorage = readCache()
  const X = ExistingStorage.filter(item => item.key == s)[0]
  textbox.value = X.value
}

//HELPERS
const dateString = () => {
  const xNow = new Date()
  return `${xNow.getFullYear().toString()}-${pd(xNow.getMonth() + 1)}-${pd(xNow.getDate())}-${pd(xNow.getHours())}-${pd(xNow.getMinutes())}-${pd(xNow.getSeconds())}`
}

const pd = (num) => num.toString().padStart(2, '0')

const extractLists = () => {
  const text = textbox.value;
  const lists3 = text.split(/\n{2,}/);
  return lists3.map(list => list.split('\n').filter(item => item.trim() !== '')).filter(list => list.length > 0)
}



function getLists() {
  const Lines = toList(textbox.value)
  const list1 = []
  const list2 = []
  let HasHit = false
  for (const line of Lines) {
    if (line == '') { HasHit = true } //skip over all empty lines
    else { if (HasHit) { list1.push(line) } else { list2.push(line) } }
  }
  return { L1: list1, L2: list2 }
}

function getUniqueItemsFromArrays(arrays) {
  const flattenedArray = arrays.flat()
  const itemCounts = {}
  for (const item of flattenedArray) {
    itemCounts[item] = (itemCounts[item] || 0) + 1
  }
  const uniqueItems = Object.keys(itemCounts).filter(item => itemCounts[item] === 1)
  return uniqueItems
}

function keyUp(txt) {
  const value = txt.value
  const charCount = value.replace(/ /g, '').length
  const rowsCount = (value.match(/\n/g) || []).length + 1
  document.getElementById('CharCount').textContent = charCount
  document.getElementById('RowsCount').textContent = rowsCount

}

function parseText(text, parseItem) {
  return fromList(text.split(new RegExp(`(?=${parseItem})`, 'g')))
}

const readCache = () => JSON.parse(localStorage.getItem('CachedItems')) || []

function refreshCacheDropdown() {
  const Doc = document.getElementById("CacheList")
  const ExistingStorage = readCache()
  const temp = document.getElementsByTagName("template")[0]

  Doc.textContent = ""
  item = temp.content.querySelector("a")
  for (i = 0; i < ExistingStorage.length; i++) {
    a = document.importNode(item, true)
    a.textContent = ExistingStorage[i].key
    a.setAttribute('onclick', "readItem('" + ExistingStorage[i].key + "')")
    Doc.appendChild(a)
  }
}

//document event handles
document.getElementById('OpenFile').addEventListener('change', (eventItem) => {
  let file = eventItem.target.files[0]
  if (!file) { return }
  let reader = new FileReader()
  reader.onload = function (event) { textbox.value = event.target.result }
  reader.readAsText(file)
})

textbox.addEventListener('dragover', (eventItem) => 
  {
  eventItem.stopPropagation()
  eventItem.preventDefault()
  eventItem.dataTransfer.dropEffect = 'copy'
} , false)

textbox.addEventListener('drop', (eventItem) => {
  eventItem.stopPropagation()
  eventItem.preventDefault()
  let reader = new FileReader()
  reader.onload = function (event) { textbox.value = event.target.result }
  reader.readAsText(eventItem.dataTransfer.files[0])
}, false)

//Saves the data to local seasion storage before the refresh button is history
window.onbeforeunload = () => {
  sessionStorage.setItem('textapp.textarea', textbox.value)
  sessionStorage.setItem('textapp.toolbar1', toolbar1.value)
  sessionStorage.setItem('textapp.toolbar2', toolbar2.value)
}

//OnLoad pulls any values from season storage
window.onload = (event) => {
  textbox.value = sessionStorage.getItem('textapp.textarea')
  toolbar1.value = sessionStorage.getItem('textapp.toolbar1')
  toolbar2.value = sessionStorage.getItem('textapp.toolbar2')
  refreshCacheDropdown()
}

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


document.getElementById("btnSwitch").addEventListener("click", () => {
  let invertedTheme = (document.documentElement.getAttribute("data-bs-theme") == "dark") ? "light" : "dark"
  document.documentElement.setAttribute("data-bs-theme", invertedTheme)
  localStorage.setItem("theme", invertedTheme)
})

document.addEventListener("DOMContentLoaded", function () {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
  let currentTheme = localStorage.getItem("theme")
  if (!currentTheme && darkThemeMq.matches) { currentTheme = "dark" }
  if (currentTheme) {
    document.documentElement.setAttribute(
      "data-bs-theme",
      currentTheme
    )
  }
})

document.addEventListener('DOMContentLoaded', function () {
  function adjustLayout() {
    let windowWidth = window.innerWidth
    let buttonGroup = document.getElementById('button-group')

    if (windowWidth >= 770) {
      buttonGroup.classList.add('btn-group-vertical')
    } else {
      buttonGroup.classList.remove('btn-group-vertical')
    }
  }

  adjustLayout()

  window.addEventListener('resize', () => { adjustLayout() })
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./serviceWorker.min.js")
}
