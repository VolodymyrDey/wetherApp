'use strict';

function set_color_bg() {
  var color = document.getElementById("color_bg").value;
  set_BG_style("body{ background-image: none; background-color:" + color + "} .search_button{background-color:" + color + "} .custom_buttons{color: #" + invertHex(color) + "}");
}

function set_picture_bg() {
  var link = document.createElement('input');
  link.setAttribute("id", "link_bg");
  link.setAttribute("placeholder", "Paste here URL to image and press ENTER");
  link.setAttribute("onkeypress", "return set_bg_img(event)");
  document.body.appendChild(link);
}

function set_bg_img(e) {
  if (e.keyCode === 13) {
    if (document.getElementById("link_bg").value === "") {
      var error_message = document.createElement('p');
      error_message.setAttribute("id","error_message");
      var t = document.createTextNode("Please paste image URL");
      error_message.appendChild(t);
      document.body.appendChild(error_message);
    } else {
      set_BG_style("body{background-image: url(" + document.getElementById("link_bg").value + "); background-color: white; background-repeat: no-repeat; background-size: 100%, cover;}");
      var link_input = document.getElementById("link_bg");
      if(link_input) link_input.parentNode.removeChild(link_input);
      var error_msg = document.getElementById("error_message");
      if(error_msg) error_msg.parentNode.removeChild(error_msg);
      return false;
    }
  }
}

function clear_bg_all() {
  set_BG_style("body{ background-image: none; background-color: #00b0ff;} .search_button{background-color: #3abcf6;} .custom_buttons{ color: #ffffff;}");
}

function set_BG_style(style) {
  var x = document.createElement("STYLE");
  var t = document.createTextNode(style);
  x.appendChild(t);
  document.head.appendChild(x);
  if(style) {
    saveChoice(style);
  }
}

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

function invertHex(hexnumb){
  var hexnum = hexnumb.substring(1,7);
  if(hexnum.length != 6) {
    alert("Hex color must be six hex numbers in length.");
    return false;
  }

  hexnum = hexnum.toUpperCase();
  var splitnum = hexnum.split("");
  var resultnum = "";
  var simplenum = "FEDCBA9876".split("");
  var complexnum = new Array();
  complexnum.A = "5";
  complexnum.B = "4";
  complexnum.C = "3";
  complexnum.D = "2";
  complexnum.E = "1";
  complexnum.F = "0";

  for(var i=0; i<6; i++){
    if(!isNaN(splitnum[i])) {
      resultnum += simplenum[splitnum[i]];
    } else if(complexnum[splitnum[i]]){
      resultnum += complexnum[splitnum[i]];
    } else {
      alert("Hex colors must only include hex numbers 0-9, and A-F");
      return false;
    }
  }

  return resultnum;
}
