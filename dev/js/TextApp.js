const textbox = document.getElementById('TextBox1');
const toolbar1 = document.getElementById('TextBox2');
const toolbar2 = document.getElementById('TextBox3');

function SingleLine()
{
  textbox.value = textbox.value.replace(/\n/g, '');
  keyUp(textbox);
}

function DistinctList() {
    try {
        var ilist = ToList(textbox.value);
        textbox.value = FromList(Array.from(new Set(ilist)));
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}


function ToList(text){
  return text.split(/\n/);
}


function SortList() {
    try {
        var items = ToList(textbox.value);
        items.sort();
        textbox.value = FromList(items);
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}

function ToUpper() {
    textbox.value = textbox.value.toUpperCase();
}

function ToLower() {
    textbox.value = textbox.value.toLowerCase();
}

function Base64Decode(){
  textbox.value = atob(textbox.value);
}


function Base64Encode(){
  textbox.value = btoa(textbox.value);
}

function RemoveXMLNamespace() {
    try {
      textbox.value = removeXmlns(removePrefexXml(textbox.value));
    } catch (err) {
        alert(err);
    }
}

function TrimStart(){
  textbox.value = FromList(ToList(textbox.value).map((item)=>{return item.trimStart();}));
}

function keyUp(txt) {
    document.getElementById('CharCount').innerText = "Chars:" + txt.value.replace(/ /g, '', '').length;
    document.getElementById('RowsCount').innerText = "Rows: " + ToList(txt.value).length;
  }

function TrimEnd(){
  textbox.value = FromList(ToList(textbox.value).map((item)=>{return item.trimEnd();}));
}

function TrimAll(){
textbox.value = FromList(ToList(textbox.value).map((item)=>{return item.trim();}));
}

function vkxml() {
    try {
        textbox.value = vkbeautify.xml(textbox.value);
    } catch (err) {
        alert(err.message);
    }
}

function vkjson() {
    try {
        textbox.value = vkbeautify.json(textbox.value);
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}


function vksql() {
    try {
        textbox.value = vkbeautify.sql(textbox.value);
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}

function vkcss() {
    try {
        textbox.value = vkbeautify.css(textbox.value);
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}

//toolbar2


function txtParse() {
    try {
        var tb2 = toolbar1.value;
        if (tb2 != '') { textbox.value = Parse(textbox.value, tb2);}
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}

function InsertStart() {
  const toolbarText = toolbar1.value;
  textbox.value = FromList(ToList(textbox.value).map((item)=>{return toolbarText + item;}));
  keyUp(textbox);
}

function InsertEnd() {
  const toolbarText = toolbar1.value;
  textbox.value = FromList(ToList(textbox.value).map((item)=>{return item + toolbarText;}));
  keyUp(textbox);
}

//toolbar3

function txtReplace() {
    try {
        textbox.value = ReplaceAll(textbox.value, toolbar1.value, toolbar2.value);
        keyUp(document.getElementById('TextBox1'));
    } catch (err) {
        alert(err.message);
    }
}

//bottom menu

function ClearCS() {
  textbox.value = '';
  toolbar1.value = '';
  toolbar2.value = '';
  keyUp(textbox);
  sessionStorage.clear();
}

function CopyToClipboard() {
  const el = document.createElement('textarea');
  el.value = textbox.value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("text copied to clipboard.");
}

function downloadFile(extention){
  try {
      var content = textbox.value;
      var d = document.createElement("a");
      d.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content)), d.setAttribute("download", "output_" + dateString() + "." + extention), d.style.display = "none", document.body.appendChild(d), d.click(), document.body.removeChild(d);
  } catch (err) {
      alert(err.message);
  }
}

function FromList(listToJoin) {
if (listToJoin.length == 0 && listToJoin[0] == '') {return ''};
return listToJoin.join('\n');
}

function ReplaceAll(e, l, n) {
    var r = new RegExp(l, "igm");
    return e.replace(r, n)
}

function Parse(text, parseItem) {
  return FromList(text.split(new RegExp(`(?=${parseItem})`, 'g')));
}

function removePrefexXml(l) {
    var e = l,
        p = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for (i = 0; i < p.length; i++) e = ReplaceAll(e, "<" + p[i] + ":", "<"), e = ReplaceAll(e, "</" + p[i] + ":", "</"), e = ReplaceAll(e, p[i] + ":nil", "nil"), e = ReplaceAll(e, p[i] + ":type", "type");
    return e
}

function removeXmlns(n) {
    for (var e = n; - 1 != e.indexOf("xmlns");) {
        var r = e.indexOf("xmlns"),
            s = e.substr(0, r),
            f = e.indexOf('"', r),
            l = e.indexOf('"', f + 1 | 0);
        e = (s || "") + (e.substr(l + 1 | 0) || "")
    }
    return ReplaceAll(e, " >", ">")
}

function dateString() {
    const xNow = new Date();
    return [
      xNow.getFullYear().toString(), tcdate((xNow.getMonth()+1).toString()), tcdate(xNow.getDate().toString()),
      tcdate(xNow.getHours().toString()), tcdate(xNow.getMinutes().toString()), tcdate(xNow.getSeconds().toString())
    ].join('-')
}

function tcdate(DigitString) {
return (DigitString.length ==1 ? '0'+ DigitString : DigitString);
}


//Saves the data to local seasion storage before the refresh button is history
window.onbeforeunload = function() {
sessionStorage.setItem('textapp.textarea', textbox.value);
sessionStorage.setItem('textapp.toolbar1', toolbar1.value);
sessionStorage.setItem('textapp.toolbar2', toolbar2.value);
}


//OnLoad pulls any values from season storage
window.onload = (event) => {
  textbox.value = sessionStorage.getItem('textapp.textarea');
  toolbar1.value = sessionStorage.getItem('textapp.toolbar1');
  toolbar2.value = sessionStorage.getItem('textapp.toolbar2');
};
