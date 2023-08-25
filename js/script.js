//Variaveis
const apiKey = "96f4e7f46f735d213d9a8f3afc59ba44";
const apiCountry = "https://flagsapi.com/";

const cityInpunt = document.querySelector("#city-input");
const serchBtn = document.querySelector("#search");

//Funções
const showWeatherData = (city) => {
  console.log(city);
}


//Eventos
serchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInpunt.value;
  
  showWeatherData(city);
});
