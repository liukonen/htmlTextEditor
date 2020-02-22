var textbox = document.getElementById('TextBox1');

function SingleLine()
{
  textbox.value = textbox.value.replace(/\n/g, '');
  keyUp(textbox);
}

function DistinctList() {
    try {
        var ilist = lines(textbox.value);
        textbox.value = ilistToString(Array.from(new Set(ilist)));
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}


function lines(text){
  return text.split(/\n/);
}


function SortList() {
    try {
        var items = lines(textbox.value);
        items.sort();
        textbox.value = ilistToString(items);
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
        var Text = textbox.value;
        Text = removePrefexXml(Text);
        Text = removeXmlns(Text);
        textbox.value = Text;
    } catch (err) {
        alert(err);
    }
}

function TrimStart(){
  var items = lines(textbox.value);
  for (i = 0; i < items.length; i++) {
    items[i] = items[i].trimStart();
  }
  textbox.value = ilistToString(items);
}

function keyUp(txt) {
  console.log(txt);
    var ilist = document.getElementById('TextBox1').value.split(/\n/);
    var serialNumbers = ilist.length;
    document.getElementById('CharCount').innerText = "Chars:" + txt.value.replace(/ /g, '', '').length;
    document.getElementById('RowsCount').innerText = "Rows: " + serialNumbers;
  }

function TrimEnd(){
  var items = lines(textbox.value);
  for (i = 0; i < items.length; i++) {
    items[i] = items[i].trimEnd();
  }
  textbox.value = ilistToString(items);
}

function TrimAll(){
  var items = lines(textbox.value);
  for (i = 0; i < items.length; i++) {
    items[i] = items[i].trim();
  }
  textbox.value = ilistToString(items);
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
        var text = textbox.value;
        var tb2 = document.getElementById('TextBox2').value;
        if (tb2 != '') {
            textbox.value = Parse(text, tb2);
        }
        keyUp(textbox);
    } catch (err) {
        alert(err.message);
    }
}

function InsertStart() {
    var ilist = lines(textbox.value);
    var insertItem = document.getElementById('TextBox2').value;
    for (i = 0; i < ilist.length; i++) {
        if (ilist[i] != "") {
            ilist[i] = insertItem + ilist[i];
        }
    }
    textbox.value = ilistToString(ilist);
    keyUp(textbox);
}

function InsertEnd() {
    var ilist = document.getElementById('TextBox1').value.split(/\n/);
    var insertItem = document.getElementById('TextBox2').value;
    for (i = 0; i < ilist.length; i++) {
        if (ilist[i] != "") {
            ilist[i] = ilist[i] + insertItem;
        }
    }
    document.getElementById('TextBox1').value = ilistToString(ilist);
    keyUp(document.getElementById('TextBox1'));
}

//toolbar3

function txtReplace() {
    try {
        document.getElementById('TextBox1').value = ReplaceAll(document.getElementById('TextBox1').value, document.getElementById('TextBox2').value, document.getElementById('TextBox3').value);
        keyUp(document.getElementById('TextBox1'));
    } catch (err) {
        alert(err.message);
    }
}

//bottom menu

function ClearCS() {
    document.getElementById('TextBox1').value = "";
    document.getElementById('TextBox2').value = "";
    document.getElementById('TextBox3').value = "";
    keyUp(document.getElementById('TextBox1'));
}

function CopyToClipboard() {
var s = textbox.value;
  const el = document.createElement('textarea');
  el.value = s;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("text copied to clipboard.");
}

function downloadFile(extention){
  try {
      var content = textbox.value;

//function download(e, t)
      var d = document.createElement("a");
      d.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content)), d.setAttribute("download", "output_" + dateString() + "." + extention), d.style.display = "none", document.body.appendChild(d), d.click(), document.body.removeChild(d);



//      download(".txt", content);
  } catch (err) {
      alert(err.message);
  }
}
function downloadtxt() {
    try {
        var content = document.getElementById('TextBox1').value;
        download(".txt", content);
    } catch (err) {
        alert(err.message);
    }
}

function downloadcsv() {
    try {
        var content = document.getElementById('TextBox1').value;
        download(".csv", content);
    } catch (err) {
        alert(err.message);
    }
}

function downloadxml() {
    try {
        var content = document.getElementById('TextBox1').value;
        download(".xml", content);
    } catch (err) {
        alert(err.message);
    }
}

function ilistToString(ilst) {
    var sb = '';
    for (i = 0; i < ilst.length; i++) {
        if ((i == 0 && ilst[i] == "") == false) {
            sb += ilst[i] + '\n';
        }
    }
    return sb.substring(0, sb.length - 1);
}

function ReplaceAll(e, l, n) {
    var r = new RegExp(l, "igm");
    return e.replace(r, n)
}

function Parse(t, n) {
    var r = t.split(n);
    if (0 < r.length)
        for (i = 1; i < r.length; i++) r[i] = n + r[i];
    return ilistToString(r)
}

function removePrefexXml(l) {
    var e = l,
        p = "ABcDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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



function download(e, t) {
    var d = document.createElement("a");
    d.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(t)), d.setAttribute("download", "output_" + dateString() + e), d.style.display = "none", document.body.appendChild(d), d.click(), document.body.removeChild(d)
}

function dateString() {
    var x = new Date();
    return x.getFullYear().toString() + "-" + tcdate((x.getMonth() + 1).toString()) + "-" + tcdate(x.getDate().toString()) + "_" + tcdate(x.getHours().toString()) + "_" + tcdate(x.getMinutes().toString()) + "_" + tcdate(x.getSeconds().toString());
}

function tcdate(s) {
    if (s.length == 1) {
        return '0' + s
    } else {
        return s;
    }
}
