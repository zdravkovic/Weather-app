import searchResults from './components/searchHandler';
import displayContent from './components/UI/displayContent';
import { dateFormat, cityNameFormat } from './components/dateAndNameFormat';
import { variables } from './components/variables';
import autocomplete from './components/UI/autocomplete';

const init = () => {
   // reset UI
   variables.inputField.value = '';
   variables.leftSide.classList.remove('hidden');
   variables.rightSide.classList.remove('hidden');
   variables.errorMessage.classList.add('hidden');
   variables.beforeSearch.classList.add('hidden');
   variables.cityName.textContent = '';
   variables.currentDate.textContent = '';
}

// Clear input field on 'first-search-screen'
const firstInit = () => {
   variables.inputFieldFirst.value = '';
}

const debounce_leading = (func, timeout = 300) => {
   let timer;
   return (...args) => {
     /* if (!timer) {
       func.apply(this, args);
     } */
     clearTimeout(timer);
     timer = setTimeout(() => {
       func.apply(this, args);
       timer = undefined;
     }, timeout);
   };
 }

// Handle 'first-search-screen' citites fields
const firstScreen = async () => {
   // Call async functions and store their values to a variables
   const searchBelgrade = await searchResults('belgrade');
   const searchBerlin = await searchResults('berlin');
   const searchParis = await searchResults('paris');
   const searchMadrid = await searchResults('madrid');

   
   // Change temperature and weather description for each city
   variables.fsBelgradeDescription.textContent = searchBelgrade.weather.weather[0].main;
   variables.fsBelgradeTemp.textContent = `${Math.ceil(searchBelgrade.weather.main.temp)}\xB0C`;
   variables.fsBerlinDescription.textContent = searchBerlin.weather.weather[0].main;
   variables.fsBerlinTemp.textContent = `${Math.ceil(searchBerlin.weather.main.temp)}\xB0C`;
   variables.fsParisDescription.textContent = searchParis.weather.weather[0].main;
   variables.fsParisTemp.textContent = `${Math.ceil(searchParis.weather.main.temp)}\xB0C`;
   variables.fsMadridDescription.textContent = searchMadrid.weather.weather[0].main;
   variables.fsMadridTemp.textContent = `${Math.ceil(searchMadrid.weather.main.temp)}\xB0C`;   
   
   
   let clickedCity;
   
   // listen to a click event on every photo
   variables.fsBelgrade.addEventListener('click', () => {
      // save clicked target to
      clickedCity = 'belgrade';
      displayWeather(clickedCity, clickedCity);
   });
   // listen to a click event on every photo
   variables.fsBerlin.addEventListener('click', () => {
      // save clicked target to
      clickedCity = 'berlin';
      displayWeather(clickedCity, clickedCity);
   });
   // listen to a click event on every photo
   variables.fsParis.addEventListener('click', () => {
      // save clicked target to
      clickedCity = 'paris';
      displayWeather(clickedCity, clickedCity);
   });
   // listen to a click event on every photo
   variables.fsMadrid.addEventListener('click', () => {
      // save clicked target to
      clickedCity = 'madrid';
      displayWeather(clickedCity, clickedCity);
   });
   
}

firstScreen();


// display weather based on searched location
const displayWeather = async (location, city) => {
   //save search results in a variables
   const res = await searchResults(location);
   
   // if results exist
   if (typeof res !== 'undefined') {
      // reset all parameters
      init();
      // display hidden UI
      variables.wholeLeftSide.classList.remove('hidden');
      variables.wholeRightSide.classList.remove('hidden');
      // display content based on search results
      displayContent(res);
      // display map based on a search results
      displayMap(res);
      
      // display city name
      variables.cityName.textContent = cityNameFormat(city);
      // display date
      dateFormat();
   
      // check if it's first search
      if (variables.firstScreen.style.width != '0') {
         // hide 'first-search-sreen'
         variables.firstScreen.style.width = '0';
         variables.inputFieldFirst.classList.remove('error-placeholder');
         // animate fade-out on background and hide it
         setTimeout(() => {
            variables.firstScreen.style.animation = 'opacity-animation .5s forwards';
            setTimeout(() => {
               variables.firstScreen.style.display = 'none';
            }, 200)
         }, 300)
      }
   } else {
      // check if 'first-search-screen' UI is removed
      if(variables.firstScreen.style.display == 'none') {
         // Clear input field
         variables.inputField.value = '';
         // Remove left and right side of UI
         variables.leftSide.classList.add('hidden');
         variables.rightSide.classList.add('hidden');
         // Display error message
         variables.errorMessageCity.innerHTML = `Couldn't find <span class="font-bold">${city.length == 0 ? 'anything' : `'${city}'`}</span>`
         variables.errorMessage.classList.remove('hidden');
         variables.beforeSearch.classList.remove('hidden');
      } else {
         // Add 'first-search-screen' error message and animations
         variables.inputFieldFirst.placeholder = `Couldn\'t find this location...`;
         variables.inputFormFirst.classList.add('form-first-error');
         variables.inputFieldWrapper.classList.add('first-div-error');
         variables.inputFieldFirst.classList.add('error-placeholder');
         variables.firstSearchIcon.classList.add('error-icon');
      }
   }
}


// Add event listener to forms
[variables.inputFormFirst, variables.inputForm].forEach((el) => {
   el.addEventListener('keyup', debounce_leading(async() => {
      console.log(variables.firstScreen.style.display !== 'none');
      if (variables.firstScreen.style.display != 'none') {
         if (el[0].value.length > 0) {

            variables.autocompleteParentFirst.innerHTML = '';
            const res = await autocomplete(el[0].value);
            res.features.map(el => {
               const listEl = document.createElement('li');
               listEl.classList.add('auto-city','hover:bg-gray-text', 'py-3', 'cursor-pointer', 'w-full', 'text-left', 'px-8');
               listEl.textContent = `${el.properties.address_line1}, ${el.properties.country}`;
               variables.autocompleteParentFirst.appendChild(listEl);
            });
            
         }
         document.querySelectorAll('.auto-city').forEach(city => {
            city.addEventListener('click', clicked => {
               let autocompleteCity = clicked.target.textContent.split(',')[0].replace(/[0-9]/g, '').trim();
               el[0].value = autocompleteCity;
               variables.autocompleteParentFirst.innerHTML = '';
               displayWeather(autocompleteCity, autocompleteCity);
            });
         });
      } else {
         console.log('it is false');
         if (el[0].value.length > 0) {

            variables.autocompleteParent.innerHTML = '';
            const res = await autocomplete(el[0].value);
            console.log(res);

            res.features.map(el2 => {
               const listEl = document.createElement('li');
               listEl.classList.add('auto-city', 'bg-light-gray-box', 'hover:bg-gray-text', 'py-3', 'cursor-pointer', 'w-full', 'text-left', 'px-8');
               listEl.textContent = `${el2.properties.address_line1}, ${el2.properties.country}`;
               variables.autocompleteParent.appendChild(listEl);
            });
            
         }
         document.querySelectorAll('.auto-city').forEach(city => {
            city.addEventListener('click', clicked => {
               let autocompleteCity = clicked.target.textContent.split(',')[0].replace(/[0-9]/g, '').trim();
               el[1].value = autocompleteCity;
               variables.autocompleteParent.innerHTML = '';
               displayWeather(autocompleteCity, autocompleteCity);
            });
         });
      }
   }));

   // Remove error message on keypress
   el[0].addEventListener('keypress', input => {
      variables.inputFormFirst.classList.remove('form-first-error');
      variables.inputFieldFirst.classList.remove('error-placeholder');
      variables.inputFieldWrapper.classList.remove('first-div-error');
      variables.firstSearchIcon.classList.remove('error-icon');
      variables.inputFieldFirst.placeholder = `Search location...`;
   });

   // Listen to submit action on both forms
   el.addEventListener('submit', form => {
      form.preventDefault();
      if (variables.firstScreen.style.display !== 'none') {
         variables.autocompleteParentFirst.innerHTML = '';
      } else {
         variables.autocompleteParent.innerHTML = '';
      }

      let inputQuery;
      // check if it's first search
      if (variables.firstScreen.style.display != 'none') {

         // save user input to a variable
         inputQuery = variables.inputFieldFirst.value;
         // check if input is correct
         if(inputQuery.trim().length > 0 && isNaN(inputQuery)) {
            // remove empty space on both ends of input
            inputQuery = inputQuery.trim();
            // clear input field 
            firstInit();
            // display weather based od input location
            displayWeather(inputQuery, inputQuery);
         }
      } else {
         // save user input to a variable
         inputQuery = variables.inputField.value;
         // check if input is correct
         if (inputQuery.trim().length > 0 && isNaN(inputQuery)) {
            // remove empty space on both ends of input
            inputQuery = inputQuery.trim();
            // display weather based on input location
            displayWeather(inputQuery, inputQuery);
         }
      }
   });
});




let map;

const displayMap = (data) => {
   // Check if map exists, and if it does remove it
   if(map !== undefined) {
      map.off();
      map.remove();
   }

   // Create map based on coordinates
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

