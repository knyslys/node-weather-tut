const cityInput = document.querySelector(".cityInput");
const cityButton = document.querySelector(".searchCityBtn");
const weatherContainer = document.querySelector(".weather-info");
const fetchUrl = "/weather?city=";
console.log("tests");
const fetchWeather = async () => {
  weatherContainer.innerHTML = "";
  weatherContainer.insertAdjacentHTML(
    "afterbegin",
    "<img src='../images/loading.gif' alt='loading' class='loading-gif'/>"
  );
  const cityFetch = await fetch(fetchUrl + cityInput.value);
  const cityJSON = await cityFetch.json();
  if (cityJSON.location === undefined) {
    weatherContainer.innerHTML = "";
    weatherContainer.insertAdjacentHTML(
      "afterbegin",
      "<h1>Please enter a valid city</h1>"
    );
    return 0;
  }
  weatherContainer.innerHTML = "";
  const html = `
  <ul class='weather-list'>
    <li class='weather-list--item'>Temperature: ${cityJSON.temperature}</li>
    <li class='weather-list--item'>Location: ${cityJSON.location}</li>
    <li class='weather-list--item'>Region: ${cityJSON.region}</li>
  </ul>
  `;
  weatherContainer.insertAdjacentHTML("afterbegin", html);
};

cityButton.addEventListener("click", fetchWeather);
