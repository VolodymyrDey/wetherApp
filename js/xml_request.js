"use strict";
//
// search function
//
function search() {
  var city_name = document.querySelector("div.search input[name=city]").value;
  if (city_name === "") {
    document.getElementById("result_city").innerHTML = "Please enter city name";
    set_style("#result_city {color: red; margin-top: 38px; transition: 1s;} #search_field{ margin-top: 75px; transition: 1s;} .search_button { margin-top: 77px; transition: 1s;}");
    deleteTable();
  } else {
    deleteTable();
    request();
  }
}
//
// Fuction for seting style
//
function set_style(style) {
  var x = document.createElement("STYLE");
  var t = document.createTextNode(style);
  x.appendChild(t);
  document.head.appendChild(x);
}

function request() {
  try {
    //
    // Build request
    //
    var city_name = document.querySelector("div.search input[name=city]").value;
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?appid=cb64092b9a1a76433cad8b70805f1d41&q=" + city_name.toString();
    var xml = new XMLHttpRequest();
    xml.open("GET", apiUrl, false);
    xml.send();
    //
    //Check responce
    //
    if (xml.status != 200) {
      document.getElementById("result_city").innerHTML = "Can't get data. Please check entered city name";
      set_style("#result_city {color: red; margin-top: 38px; transition: 1s;} #search_field{ margin-top: 75px; transition: 1s;} .search_button { margin-top: 77px; transition: 1s;}");
    } else {
      //
      // Create array with results
      //
      var weather_obj = JSON.parse(xml.responseText);
      var result_array = [[],[],[],[]];
      for (var i = 0; i < weather_obj.list.length; i++) {
        result_array[0][i] = weather_obj.list[i].dt_txt.substring(0, weather_obj.list[i].dt_txt.length - 9) + "  " + weather_obj.list[i].dt_txt.substring(11, weather_obj.list[i].dt_txt.length);
        result_array[1][i] = "Temperature " + Math.floor(weather_obj.list[i].main.temp_min - 270) + " °C";
        result_array[2][i] = weather_obj.list[i].weather[0].description;
        result_array[3][i] = "http://openweathermap.org/img/w/" + weather_obj.list[i].weather[0].icon + ".png";
      }
      //
      //Show results
      //
      document.getElementById("result_city").innerHTML = "Weather in city " + weather_obj.city.name;
      set_style("#result_city {color: white;margin-top: 5px; transition: 1s;} #search_field{ margin-top: 5px;} .search_button { margin-top: 7px;}");
      createTable(result_array);
    }
  } catch (e) {
    //
    // Error if something wrong
    //
    document.getElementById("result_city").innerHTML = "Can't get data. Please check entered city name and your intenet connection";
    set_style("#result_city {color: red; margin-top: 38px; transition: 1s;} #search_field{ margin-top: 75px; transition: 1s;} .search_button { margin-top: 77px; transition: 1s;}");
    deleteTable();
  }
}
//
// Dynamicly generate table with results
//
function createTable(tableData) {
  //
  // Define table heders and body
  //
  var row_count = 0;
  var table = document.createElement('table');
  table.setAttribute("id", "resultTable");
  var tableBody = document.createElement('tbody');
  //
  // Building table row
  //
  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.setAttribute("id", "cellStyle");
      //
      // Seting different styles to image cells
      //
      if (row_count === 3) {
        var cellImgData = document.createElement("img");
        cellImgData.setAttribute("src", cellData);
        cell.appendChild(cellImgData);
      } else {
        cell.appendChild(document.createTextNode(cellData));
      }
      row.appendChild(cell);
    });
    //
    // Finish building row
    //
    row_count++;
    tableBody.appendChild(row);
  });
  //
  // Finish building table
  //
  table.appendChild(tableBody);
  document.body.appendChild(table);
}
//
// Delete table
//
function deleteTable() {
  var tbl = document.getElementById("resultTable");
  if(tbl) tbl.parentNode.removeChild(tbl);
}
//
// Listener to ENTER button
//
function runScript(e) {
    if (e.keyCode === 13) {
        search();
        return false;
    }
}
