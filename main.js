import searchResults from './components/searchHandler';
import displayContent from './components/UI/displayContent';
import { dateFormat, cityNameFormat } from './components/dateAndNameFormat';
import { variables } from './components/variables';

const init = () => {
   variables.inputField.value = '';
   variables.leftSide.classList.remove('hidden');
   variables.rightSide.classList.remove('hidden');
   variables.errorMessage.classList.add('hidden');
   variables.beforeSearch.classList.add('hidden');
   variables.cityName.textContent = '';
   variables.currentDate.textContent = '';
}

const firstInit = () => {
   variables.inputFieldFirst.value = '';
   
}

const firstScreen = async () => {
   const searchBelgrade = await searchResults('belgrade');
   const searchBerlin = await searchResults('berlin');
   const searchParis = await searchResults('paris');
   const searchMadrid = await searchResults('madrid');

   variables.fsBelgradeDescription.textContent = searchBelgrade.weather.weather[0].main;
   variables.fsBelgradeTemp.textContent = `${Math.ceil(searchBelgrade.weather.main.temp)}\xB0C`;
   variables.fsBerlinDescription.textContent = searchBerlin.weather.weather[0].main;
   variables.fsBerlinTemp.textContent = `${Math.ceil(searchBerlin.weather.main.temp)}\xB0C`;
   variables.fsParisDescription.textContent = searchParis.weather.weather[0].main;
   variables.fsParisTemp.textContent = `${Math.ceil(searchParis.weather.main.temp)}\xB0C`;
   variables.fsMadridDescription.textContent = searchMadrid.weather.weather[0].main;
   variables.fsMadridTemp.textContent = `${Math.ceil(searchMadrid.weather.main.temp)}\xB0C`;   

   let clickedCity;
   variables.fsBelgrade.addEventListener('click', () => {
      clickedCity = 'belgrade';
      displayWeather(clickedCity, clickedCity);
   });
   variables.fsBerlin.addEventListener('click', () => {
      clickedCity = 'berlin';
      displayWeather(clickedCity, clickedCity);
   });
   variables.fsParis.addEventListener('click', () => {
      clickedCity = 'paris';
      displayWeather(clickedCity, clickedCity);
   });
   variables.fsMadrid.addEventListener('click', () => {
      clickedCity = 'madrid';
      displayWeather(clickedCity, clickedCity);
   });
   
}

firstScreen();


const displayWeather = async (location, city) => {

   const res = await searchResults(location);

   if (typeof res !== 'undefined') {
      init();

      displayContent(res);
      displayMap(res);
      

      variables.cityName.textContent = cityNameFormat(city);
      dateFormat();
   
      if (variables.firstScreen.style.width != '0') {
         variables.firstScreen.style.width = '0';
         variables.inputFieldFirst.classList.remove('error-placeholder');
         variables.wholeLeftSide.classList.remove('hidden');
         variables.wholeRightSide.classList.remove('hidden');

         setTimeout(() => {
            variables.firstScreen.style.animation = 'opacity-animation .5s forwards';
            setTimeout(() => {
               variables.firstScreen.style.display = 'none';
            }, 200)
         }, 300)
      }
   } else {

      if(variables.firstScreen.style.display == 'none') {
         variables.inputField.value = '';
         variables.leftSide.classList.add('hidden');
         variables.rightSide.classList.add('hidden');
         variables.errorMessageCity.innerHTML = `Couldn't find <span class="font-bold">${city.length == 0 ? 'anything' : `'${city}'`}</span>`
         variables.errorMessage.classList.remove('hidden');
         variables.beforeSearch.classList.remove('hidden');
      } else {
         variables.inputFieldFirst.placeholder = `Couldn\'t find this location...`;
         variables.inputFormFirst.classList.add('form-first-error');
         variables.inputFieldWrapper.classList.add('first-div-error');
         variables.inputFieldFirst.classList.add('error-placeholder');
         variables.firstSearchIcon.classList.add('error-icon');
      }
   }
}



[variables.inputFormFirst, variables.inputForm].forEach((el) => {
   el[0].addEventListener('keypress', input => {
      variables.inputFormFirst.classList.remove('form-first-error');
      variables.inputFieldFirst.classList.remove('error-placeholder');
      variables.inputFieldWrapper.classList.remove('first-div-error');
      variables.firstSearchIcon.classList.remove('error-icon');
      variables.inputFieldFirst.placeholder = `Search location...`;
   })
   el.addEventListener('submit', form => {
      form.preventDefault();
      let inputQuery;

      if (variables.firstScreen.style.display != 'none') {

         inputQuery = variables.inputFieldFirst.value;

         firstInit();
         displayWeather(inputQuery, inputQuery);
      } else {

         inputQuery = variables.inputField.value;
      
      
         displayWeather(inputQuery, inputQuery);
      }
   
   
   });
});


let map;

const displayMap = (data) => {
   if(map !== undefined) {
      map.off();
      map.remove();
   }

   map = L.map('map', {
      attributionControl: false,
   }).setView([data.weather.coord.lat, data.weather.coord.lon], 5);
   
   L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      maxZoom: 10,
   }).addTo(map);
   
   L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=cf49fd067a11578dea17f88bff1fc56d`, {
      maxZoom: 10
   }).addTo(map); 
}

