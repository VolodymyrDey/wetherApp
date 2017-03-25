'use strict';

function set_color_bg() {
  var color = document.getElementById("color_bg").value;
  set_style("body{background-color:" + color + "} #search_field{background-color:" + color + "} .search_button{background-color:" + color + "}");
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
      set_style("body{background-image: url(" + document.getElementById("link_bg").value + "); background-color: white;}");
      var link_input = document.getElementById("link_bg");
      if(link_input) tbl.parentNode.removeChild(link_input);
      return false;
  }
}

function set_style(style) {
  var x = document.createElement("STYLE");
  var t = document.createTextNode(style);
  x.appendChild(t);
  document.head.appendChild(x);
}