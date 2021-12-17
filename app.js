const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityNames = Array.from(document.getElementsByClassName("city"));
const mainTable = document.querySelector(".main-table");
const none = document.querySelector(".none");
const inputCity = document.getElementById("city").value;
const searchBtn = document.querySelector(".search-btn");
const tr = document.querySelector("tr");

getWeatherBtn.addEventListener("click", function (e) {
  none.style.display = "none";

  cityNames.forEach(async city => {
    const weather = await getWeather(capitalizeFirstLetter(city.textContent));
    const {
      date_and_time,
      description,
      humidity_in_percent,
      pressure_in_hPa,
      temp_in_celsius,
    } = weather;
    const hours = new Date(date_and_time).getHours();
    mainTable.insertAdjacentHTML(
      "afterend",
      `<tr>
    <td class="${city.textContent.toLowerCase()}">${city.textContent}</td>
    <td>${description}</td>
    <td>${temp_in_celsius}</td>
    <td>${pressure_in_hPa}</td>
    <td>${hours}</td>
    <td><button class="delete bg-primary" id="${city.textContent.toLowerCase()}">X</button></td>
  </tr>`
    );

    //DELETE
    const deleteWeatherBtns = Array.from(document.querySelectorAll(".delete"));
    deleteWeatherBtns.forEach(btn => {
      btn.addEventListener("click", e => {
        if (e.target.id === city.textContent.toLowerCase()) {
          const td = btn.parentElement.parentElement;
          td.remove();
        }
      });
    });

    // HIGHLIGHT FUNCTIONALOTY STILL UNFINISHED
    searchBtn.addEventListener("click", e => {
      e.preventDefault();
      const c = tr.querySelector(`${city.textContent.toLowerCase()}`);
      console.log(c);
      if (inputCity.toLowerCase() === city.textContent.toLowerCase()) {
      }
    });
  });
});

async function getWeather(city) {
  const url = `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`;
  const res = await fetch(url);
  return res.json();
}

function capitalizeFirstLetter(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}
