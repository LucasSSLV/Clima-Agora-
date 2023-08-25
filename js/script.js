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
const getWeatherData = async (city) => {
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
 
  const res = await fetch(apiWeatherUrl);
  const data = await res.json();

  console.log(data);
  return data;
};

const showWeatherData = async(city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = data.main.temp;
  descElement.innerText = data.weather[0].description;
  weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

};

//Eventos
serchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInpunt.value;

  showWeatherData(city);
});
