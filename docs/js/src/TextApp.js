const textbox = document.getElementById('TextBox1')
const toolbar1 = document.getElementById('TextBox2')
const toolbar2 = document.getElementById('TextBox3')


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
const  openDialog = () => document.getElementById("OpenFile").click()

function singleLine() {
  textbox.value = textbox.value.replace(/\n/g, '')
  keyUp(textbox)
}

const distinctList = () => {
  try {
    const lines = textbox.value.split(/\n/)
    textbox.value = Array.from(new Set(lines)).join('\n')
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

const sortList = () => {
  try {
    let items = toList(textbox.value)
    items.sort()
    textbox.value = fromList(items)
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

const toUpper = () => textbox.value = textbox.value.toUpperCase() 
const toLower = () => textbox.value = textbox.value.toLowerCase() 

function dupicateLines() {
  let Items = toList(textbox.value)
  console.log(Items)
  let X = Items.map(line => line.toString() + line.toString())
  textbox.value = fromList(X)
}

function trimText(method) {
  const trimmedItems = toList(textbox.value).map(item => item[method]())
  textbox.value = fromList(trimmedItems)
}

const urlEncode = () => textbox.value = encodeURI(textbox.value)
const urlDecode = () => textbox.value = decodeURI(textbox.value)

const base64Decode = () => textbox.value = atob(textbox.value)
const base64Encode = () => textbox.value = btoa(textbox.value)

function removeXMLNamespace() {
  try {
    textbox.value = removeXmlns(removePrefixXml(textbox.value))
  } catch (err) {
    alert(err)
  }
}

function beautify(type) {
  try {
    textbox.value = vkbeautify[type](textbox.value)
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

function getDistintItemsFromLists() {
  let lists = extractLists()
  let distinct = getUniqueItemsFromArrays(lists)
  let outputValue = "" 
  
  for (const list of lists) {
    outputValue += fromList(list.filter(obj => { return distinct.indexOf(obj) != -1 })) + "\n\n"
  } 
  
  textbox.value = outputValue
  outputValue = ""
}

function getMatchingItemsFromLists() {
  let nonEmptyLists = extractLists()
  let commonStrings = nonEmptyLists[0] || []
  nonEmptyLists.slice(1).forEach(list => {
    commonStrings = commonStrings.filter(str => list.includes(str))
  })
  textbox.value = fromList(commonStrings)
  keyUp
}

function speak() {
  const msg = new SpeechSynthesisUtterance()
  msg.text = textbox.value
  window.speechSynthesis.speak(msg)
}

//BOTTOM ROW

//SINGLE LINE ITEMS
function txtParse() {
  try {
    let tb2 = toolbar1.value
    if (tb2 != '') { textbox.value = parseText(textbox.value, tb2) }
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

function insertStart() {
  const toolbarText = toolbar1.value
  textbox.value = toolbarText + textbox.value.replace(/\n/g, '\n' + toolbarText)
  keyUp(textbox)
}
function insertEnd() {
  const toolbarText = toolbar1.value
  textbox.value = textbox.value.replace(/\n/g, toolbarText + '\n') + toolbarText
  keyUp(textbox)
}

//DOUBLE LINE ITEMS
function txtReplace() {
  try {
    textbox.value = textbox.value.replaceAll(toolbar1.value, toolbar2.value)
    keyUp(document.getElementById('TextBox1'))
  } catch (err) {
    alert(err.message)
  }
}

//INDIVIUAL ITEMS
function clearScreen() {
  [textbox.value, toolbar1.value, toolbar2.value] = ['', '', '']
  keyUp(textbox)
  sessionStorage.clear()
}

function copyToClipboard() {
  navigator.clipboard.writeText(textbox.value).then(() => {alert("text copied to clipboard.")}).catch(err => {alert(err.message)})
}

function downloadFile(extension) {
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

function saveToCache() {
  const ExistingStorage = readCache()
  ExistingStorage.push({ key: dateString(), value: textbox.value })
  setCache(ExistingStorage)
  refreshCacheDropdown()
}

function clearCache() {
  localStorage.removeItem('CachedItems')
  refreshCacheDropdown()
}

function readItem(s) {
  const ExistingStorage = readCache()
  const X = ExistingStorage.filter(item => item.key == s)[0]
  textbox.value = X.value
}

//HELPERS
function dateString() {
  const xNow = new Date()
  const year = xNow.getFullYear().toString()
  const month = (xNow.getMonth() + 1).toString().padStart(2, '0')
  const day = xNow.getDate().toString().padStart(2, '0')
  const hours = xNow.getHours().toString().padStart(2, '0')
  const minutes = xNow.getMinutes().toString().padStart(2, '0')
  const seconds = xNow.getSeconds().toString().padStart(2, '0')
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`
}

function extractLists() {
  const text = textbox.value;
  const lists3 = text.split(/\n{2,}/);
  return lists3.map(list => list.split('\n').filter(item => item.trim() !== '')).filter(list => list.length > 0)
}

const fromList = (listToJoin) => (listToJoin.length == 0 && listToJoin[0] == '') ? '' : listToJoin.join('\n') 

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

function handleDragOver(eventItem) {
  eventItem.stopPropagation()
  eventItem.preventDefault()
  eventItem.dataTransfer.dropEffect = 'copy'
}

function handleFileOpen(eventItem) {
  console.log(eventItem)
  let file = eventItem.target.files[0]
  if (!file) { return }
  let reader = new FileReader()
  reader.onload = function (event) { textbox.value = event.target.result }
  reader.readAsText(file)
}

function handleFileSelect(eventItem) {
  eventItem.stopPropagation()
  eventItem.preventDefault()
  let reader = new FileReader()
  reader.onload = function (event) { textbox.value = event.target.result }
  reader.readAsText(eventItem.dataTransfer.files[0])
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

function removePrefixXml(xml) {
  return xml.replace(/<[A-Z]+:/g, "<").replace(/<\/[A-Z]+:/g, "</").replace(/[A-Z]+:nil/g, "nil").replace(/[A-Z]+:type/g, "type")
}

function removeXmlns(xml) {
  return xml.replace(/xmlns[^"]*"[^"]*"/g, "").replace(/\s+>/g, ">")
}

function setCache(s) { localStorage.setItem('CachedItems', JSON.stringify(s)) }

const toList = (text) => text.split(/\n/) 

//document event handles
document.getElementById('OpenFile').addEventListener('change', handleFileOpen)
textbox.addEventListener('dragover', handleDragOver, false)
textbox.addEventListener('drop', handleFileSelect, false)

//Saves the data to local seasion storage before the refresh button is history
window.onbeforeunload = function () {
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

document.addEventListener('DOMContentLoaded', function() {
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

  window.addEventListener('resize', ()  => { adjustLayout() })
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./serviceWorker.min.js")
}
