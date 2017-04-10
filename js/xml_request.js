"use strict";

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

function set_style(style) {
  var x = document.createElement("STYLE");
  var t = document.createTextNode(style);
  x.appendChild(t);
  document.head.appendChild(x);
}

function request() {
  try {
    var city_name = document.querySelector("div.search input[name=city]").value;
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?appid=cb64092b9a1a76433cad8b70805f1d41&q=" + city_name.toString();
    var xml = new XMLHttpRequest();
    xml.open("GET", apiUrl, false);
    xml.send();
    if (xml.status != 200) {
      document.getElementById("result_city").innerHTML = "Can't get data. Please check entered city name";
      set_style("#result_city {color: red; margin-top: 38px; transition: 1s;} #search_field{ margin-top: 75px; transition: 1s;} .search_button { margin-top: 77px; transition: 1s;}");
    } else {
      var weather_obj = JSON.parse(xml.responseText);
      var result_array = [[],[],[],[]];
      for (var i = 0; i < weather_obj.list.length; i++) {
        result_array[0][i] = weather_obj.list[i].dt_txt.substring(0, weather_obj.list[i].dt_txt.length - 9) + "  " + weather_obj.list[i].dt_txt.substring(11, weather_obj.list[i].dt_txt.length);
        result_array[1][i] = "Temperature " + Math.floor(weather_obj.list[i].main.temp_min - 270) + " °C";
        result_array[2][i] = weather_obj.list[i].weather[0].description;
        result_array[3][i] = "http://openweathermap.org/img/w/" + weather_obj.list[i].weather[0].icon + ".png";
      }
      document.getElementById("result_city").innerHTML = "Weather in city " + weather_obj.city.name;
      set_style("#result_city {color: white;margin-top: 5px; transition: 1s;} #search_field{ margin-top: 5px;} .search_button { margin-top: 7px;}");
      createTable(result_array);
    }
  } catch (e) {
    document.getElementById("result_city").innerHTML = "Can't get data. Please check entered city name and your intenet connection";
    set_style("#result_city {color: red; margin-top: 38px; transition: 1s;} #search_field{ margin-top: 75px; transition: 1s;} .search_button { margin-top: 77px; transition: 1s;}");
    deleteTable();
  }
}

function createTable(tableData) {
  var row_count = 0;
  var table = document.createElement('table');
  table.setAttribute("id", "resultTable");
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.setAttribute("id", "cellStyle");
      switch (row_count) {
        case 3:
          var cellImgData = document.createElement("img");
          cellImgData.setAttribute("src", cellData);
          cell.appendChild(cellImgData);
          break;
        default:
          cell.appendChild(document.createTextNode(cellData));

      }

      row.appendChild(cell);
    });

    row_count++;
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}

function deleteTable() {
  var tbl = document.getElementById("resultTable");
  if(tbl) tbl.parentNode.removeChild(tbl);
}

function runScript(e) {
    if (e.keyCode === 13) {
        search();
        return false;
    }
}
