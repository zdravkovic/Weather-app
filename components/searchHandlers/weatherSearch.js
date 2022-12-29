

const weatherSearch = async (data, api) => {
   try {
      // Fetch data using latitude and longitude
      const weatherSearchHandler = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${data.lat}&lon=${data.lon}&appid=${api.key}`)
      .then();
      const weatherSearchResponse = await weatherSearchHandler.json();

      return weatherSearchResponse;
   } catch (error) {
      console.error(error)
   }
}

export default weatherSearch;