'use strict';

function set_color_bg() {
  var color = document.getElementById("color_bg").value;
  setBgstyle("body{background-color:" + color + "} #search_field{background-color:" + color + "} .search_button{background-color:" + color + "}");
}

function set_picture_bg() {
  var link = document.createElement('input');
  link.setAttribute("id", "link_bg");
  link.setAttribute("placeholder", "Paste link to page");
  link.setAttribute("onkeypress", "return set_bg_img(event)");
  document.body.appendChild(link);
}

function set_bg_img(e) {
  if (e.keyCode === 13) {
      setBgstyle("body{background-image: url(" + document.getElementById("link_bg").value + "); background-color: white;}");
      var link_input = document.getElementById("link_bg");
      if(link_input) tbl.parentNode.removeChild(link_input);
      return false;
  }
}

function setBgstyle(style) {
  var x = document.createElement("STYLE");
  var t = document.createTextNode(style);
  x.appendChild(t);
  document.head.appendChild(x);
  if(style) {
    saveChoice(style);
  }
}

//save style with bgImage or bgColor to LocalStorage
function saveChoice(value) {
  if (storageAvailable('localStorage')) {
    localStorage.setItem('bg', value);
  }
}
document.addEventListener('DOMContentLoaded', function() {
  if(localStorage.getItem !== 'undefined') {
    set_style(localStorage.getItem('bg'));
  }
});

//check if Web Storage is available
function storageAvailable(type) {
	try {
		const storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}
