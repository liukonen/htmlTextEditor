const textbox = document.getElementById('TextBox1')
const toolbar1 = document.getElementById('TextBox2')
const toolbar2 = document.getElementById('TextBox3')

const cachedItems = "items"
const toList = (text) => text.split(/\r?\n/)
const replaceText = (requestTextbox, value, replacementValue) => requestTextbox.value.replace(value, replacementValue)
const distinct = (list) => Array.from(new Set(list))
const fromList = (listToJoin) => (listToJoin.length == 0 && listToJoin[0] == '') ? '' : listToJoin.join('\n')
const sort = (arrayItems) => arrayItems.sort()
const ListDisect = (transformFunction) => fromList(toList(textbox.value).map(item => transformFunction(item)))
const removePrefixXml = (xml) => xml.replace(/<[A-Z]+:/g, "<").replace(/<\/[A-Z]+:/g, "</").replace(/[A-Z]+:nil/g, "nil").replace(/[A-Z]+:type/g, "type")
const removeXmlns = (xml) => xml.replace(/xmlns[^"]*"[^"]*"/g, "").replace(/\s+>/g, ">")
const parseText = (text, parseItem) => fromList(text.split(new RegExp(`(?=${parseItem})`, 'g')))

const keyUp = (txt) => {
  const value = txt.value
  const charCount = value.replaceAll(' ', '').length
  const rowsCount = (value.match(/\n/g) || []).length + 1
  document.getElementById('CharCount').textContent = charCount
  document.getElementById('RowsCount').textContent = rowsCount

}
const compressData = async (data) => {
  const stream = new CompressionStream('gzip')
  const writer = stream.writable.getWriter()
  writer.write(new TextEncoder().encode(data))
  writer.close()
  return new Response(stream.readable).arrayBuffer()
}

const decompressData = async (compressedData) => {
  const stream = new DecompressionStream('gzip')
  const writer = stream.writable.getWriter()
  writer.write(compressedData)
  writer.close()
  return new Response(stream.readable).arrayBuffer().then(buffer =>
    new TextDecoder().decode(buffer)
  )
}
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
    const value = Number(toolbar2.value);
    const step = Number.isFinite(value) && value >= 1 && value <= 8 ? value : 2
    textbox.value = vkbeautify[type](textbox.value, step)
    keyUp(textbox)
  } catch (err) {
    alert(err.message)
  }
}

const minify = (type) => {
  const funcName = type.toLowerCase() + 'min';
  try {  
    const func = vkbeautify[funcName];
    if (funcName === 'xmlmin' || funcName === 'cssmin' || funcName === 'sqlmin') {
      textbox.value = func(textbox.value, false);
    } else {
      textbox.value = func(textbox.value);
    }
  }
  catch (err) {
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
  this.speechSynthesis.speak(msg)
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
  textbox.value = toolbarText + textbox.value.replaceAll('\n', '\n' + toolbarText)
  keyUp(textbox)
}

const insertEnd = () => {
  const toolbarText = toolbar1.value
  textbox.value = textbox.value.replaceAll('\n', toolbarText + '\n') + toolbarText
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
const clearScreen = () => {
  [textbox.value, toolbar1.value, toolbar2.value] = ['', '', '']
  keyUp(textbox)
  sessionStorage.clear()
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(textbox.value).then(() => { alert("text copied to clipboard.") }).catch(err => { alert(err.message) })
}

const downloadFile = (extension) => {
  try {
    downloadContent(textbox.value, extension)
  } catch (err) {
    alert(err.message)
  }
}

const generateFilename = (extension) => `output_${dateString()}.${extension}`

const downloadContent = (content, extension) => {
  const blob = new Blob([textbox.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const downloadLink = document.createElement('a')
  const filename = generateFilename(extension)
  downloadLink.href = url
  downloadLink.download = filename
  document.body.appendChild(downloadLink)
  downloadLink.click()
  downloadLink.remove()
  URL.revokeObjectURL(url)
}

// SAVE FUNCTIONALITY
const DB_NAME = "HTMLTextEditorDB"
const STORE = "cache"
const DB_VERSION = 1


// ---------- CONNECT DB ----------
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "key" })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}


const db = {
  async put(item) {
    const database = await openDB()
    const tx = database.transaction(STORE, "readwrite")
    tx.objectStore(STORE).put(item)
  },

  async getAll() {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, "readonly")
      const req = tx.objectStore(STORE).getAllKeys()
      console.log("Request: ", req)
      req.onsuccess = () => resolve(req.result || [])
      req.onerror = () => reject(req.error)
    })
  },

  async get(key) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, "readonly")
      const req = tx.objectStore(STORE).get(key)
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => reject(req.error)
    })
  },

  async delete(key) {
    const database = await openDB()
    const tx = database.transaction(STORE, "readwrite")
    tx.objectStore(STORE).delete(key)
  },

  async clear() {
    const database = await openDB()
    const tx = database.transaction(STORE, "readwrite")
    tx.objectStore(STORE).clear()
  }
}


const readCache = async () => {
  const idbData = await db.getAll()
  console.log("IDB Data: ", idbData)
  let lsData = []
  const raw = localStorage.getItem(cachedItems)
  if (raw) {
    try {
      const decompressed = await decompressData(
        Uint8Array.from(atob(raw), c => c.codePointAt(0))
      )
      lsData = JSON.parse(decompressed)
    } catch (e) {
      console.warn("localStorage decode failed", e)
    }
  }
  const map = new Map();
  for (const item of lsData) map.set(item.key, item)
  for (const item of idbData) map.set(item, {"key": item })
  return Array.from(map.values())
}


const saveToCache = async () => {
  const item = {
    key: dateString(),
    value: await compressData(textbox.value), 
  }
  await db.put(item)
  await refreshCacheDropdown()
}


const readItem = async (key) => {
  const idb = await db.get(key)
  if (idb) {
    textbox.value = await decompressData(idb.value)
    return
  }
  const all = await readCache()
  const item = all.find(x => x.key === key)
  if (item) textbox.value = item.value
}

const refreshCacheDropdown = async () => {
  const doc = document.getElementById("CacheList")
  const data = await readCache()
  doc.textContent = ""
  const temp = document.getElementsByTagName("template")[0]
  const item = temp.content.querySelector("a")
  for (const storageItem of data) {
    const a = document.importNode(item, true)
    a.textContent = storageItem.key
    a.setAttribute("onclick", `readItem('${storageItem.key}')`)
    doc.appendChild(a)
  }
}

const removeMe = async (event) => {
  const target = event.currentTarget
  if (!confirm("Are you sure you want to remove this item?")) return
  const key = target.textContent
  await db.delete(key)
  let existing = await readCache()
  existing = existing.filter(item => item.key !== key)
  const compressed = await compressData(JSON.stringify(existing))
  localStorage.setItem(
    cachedItems,
    btoa(String.fromCodePoint(...new Uint8Array(compressed)))
  );
  target.remove()
}

const clearCache = async () => {
  await db.clear()
  localStorage.removeItem(cachedItems)
  await refreshCacheDropdown()
}

// END SAVE

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


const getUniqueItemsFromArrays = (arrays) => { 
  const flattenedArray = arrays.flat()
  const itemCounts = {}
  for (const item of flattenedArray) {
    itemCounts[item] = (itemCounts[item] || 0) + 1
  }
  const uniqueItems = Object.keys(itemCounts).filter(item => itemCounts[item] === 1)
  return uniqueItems
}

//document event handles
document.getElementById('OpenFile').addEventListener('change', (eventItem) => {
  let file = eventItem.target.files[0]
  if (!file) { return }
  file.text().then(text => { textbox.value = text })
})

textbox.addEventListener('dragover', (eventItem) => {
  eventItem.stopPropagation()
  eventItem.preventDefault()
  eventItem.dataTransfer.dropEffect = 'copy'
}, false)

textbox.addEventListener('drop', (eventItem) => {
  eventItem.stopPropagation()
  eventItem.preventDefault()
  eventItem.dataTransfer.files[0].text().then(text => { textbox.value = text })
}, false)

//Saves the data to local seasion storage before the refresh button is history
window.onbeforeunload = () => {
  sessionStorage.setItem('textapp.textarea', textbox.value)
  sessionStorage.setItem('textapp.toolbar1', toolbar1.value)
  sessionStorage.setItem('textapp.toolbar2', toolbar2.value)
}

//OnLoad pulls any values from season storage
window.onload = async (event) => {
  textbox.value = sessionStorage.getItem('textapp.textarea')
  toolbar1.value = sessionStorage.getItem('textapp.toolbar1')
  toolbar2.value = sessionStorage.getItem('textapp.toolbar2')
  await refreshCacheDropdown()
}

document.getElementById("btnSwitch").addEventListener("click", () => {
  let invertedTheme = (document.documentElement.dataset.bsTheme == "dark") ? "light" : "dark"
  document.documentElement.dataset.bsTheme = invertedTheme
  localStorage.setItem("theme", invertedTheme)
})



if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./serviceWorker.min.js")
}
