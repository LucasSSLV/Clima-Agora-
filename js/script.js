//Variaveis
const apiKey = "96f4e7f46f735d213d9a8f3afc59ba44";
const apiCountry = "https://flagsapi.com/";

const cityInpunt = document.querySelector("#city-input");
const serchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

//Funções
// Chamada para a API de geocodificação
function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Chamada para a API de geocodificação
  fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  )
    .then((response) => response.json())
    .then((data) => {
      var city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Cidade desconhecida";
      showWeatherData(city);
    })
    .catch((error) => {
      console.error("Erro ao obter informações da cidade:", error);
    });
}

function showError(error) {
  console.error("Erro ao obter a geolocalização:", error);
  var coordinatesElement = document.getElementById("coordinates");
  coordinatesElement.textContent = "Erro ao obter a geolocalização.";
}
// Obtém a geolocalização assim que a página é carregada
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  showError({ message: "Geolocalização não é suportada neste navegador." });
}

const getWeatherData = async (city) => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherUrl);
  const data = await res.json();
  if (data.cod === "404") {
    alert("Cidade não encontrada");
  }
  // console.log(data);
  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute(
    "src",
    `${apiCountry}${data.sys.country}/flat/64.png`
  );
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed} km/h`;
};

//Eventos
serchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInpunt.value;

  showWeatherData(city);
});
