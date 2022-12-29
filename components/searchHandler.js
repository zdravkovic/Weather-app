import forecastSearch from './searchHandlers/forecastSearch';
import weatherSearch from './searchHandlers/weatherSearch';

const api = {
   key: 'cf49fd067a11578dea17f88bff1fc56d',
};

const weatherResults = async (query) => {
   try {
      // Fetch data using query input
      const geoSearch = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${api.key}`);
      const geoSearchData = await geoSearch.json();

      // Store data in object
      const geoData = {
         cityName: geoSearchData[0].name,
         lat: geoSearchData[0].lat,
         lon: geoSearchData[0].lon,
      }
      
      // Save data of weather search as variable
      const weather = await weatherSearch(geoData, api);
      // Save data of forecast search as variable
      const forecast = await forecastSearch(geoData, api);

      // export all data as one object
      const weatherData = {
         geoData: geoData,
         weather: weather,
         forecast: forecast,
      }

      return weatherData;
      
   } catch (error) {
      console.log(`Could not get location: ${query}. Please search for some other location`);
   }
}

export default weatherResults;