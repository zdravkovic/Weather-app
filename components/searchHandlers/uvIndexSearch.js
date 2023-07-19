const uvSearch = async (data) => {
   // Fetch data using latitude and longitude
   try {
      const uvIndexSearch = await fetch(`https://api.openuv.io/api/v1/uv?lat=${data.lat}&lng=${data.lon}`, {
         headers: {
            "content-type": "application/json;charset=UTF-8",
            "x-access-token": 'd915876a6373a8f0b15ba8cf531a699b'
         }
      });
      const uvIndexData = await uvIndexSearch.json();
      
      return uvIndexData.result.uv;
   } catch (error) {
      throw new Error('Request limit reached. Try again later');
   }
}

export default uvSearch;