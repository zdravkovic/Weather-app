const airPolutionSearch = async (data) => {

   const airAPI = '3fe98502-6019-4e94-ac6e-190bffd96902';

   try {
      // Fetch data from api using latitude and longitude
      const airQualityIndexSearch = await fetch(`https://api.airvisual.com/v2/nearest_city?lat=${data.lat}&lon=${data.lon}&key=${airAPI}`);
      const airQualityIndexResponse = await airQualityIndexSearch.json();

      // save result as object
      const airPolutionData = {
         aqi: airQualityIndexResponse.data.current.pollution.aqius,
      }
      return airPolutionData;
   } catch(error) {
      throw new Error('Request limit reached. Try again later.');
   }
}

export default airPolutionSearch;