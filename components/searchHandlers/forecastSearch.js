
const forecastSearch = async (data, api) => {
   // Create object for storing data
   const forecastData = {
      temp: [],
      description: [],
      icons: []
   };

   try {
      // Fetch date usind latitude and longitude
      const forecastSearchHandler = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${data.lat}&lon=${data.lon}&appid=${api.key}`);
      const forecastSearchResponse = await forecastSearchHandler.json();
      
      // Loop through array of data and extract forecast for every day
      for (let i = 0; i < forecastSearchResponse.list.length; i+=8) {
         forecastData.temp.push(Math.floor(forecastSearchResponse.list[i].main.temp));
         forecastData.description.push(forecastSearchResponse.list[i].weather[0].main);
         forecastData.icons.push(`${forecastSearchResponse.list[i].weather[0].icon.slice(0,2)}d.png`);
      }

      return forecastData;

   } catch (error) {
      console.error(error)
   }


}

export default forecastSearch;