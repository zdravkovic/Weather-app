const api = '81418967b79e4300849d82f3fd6b8c73';

var requestOptions = {
   method: 'GET',
 };


const autocomplete = async (query) => {
   try {
      const autocompleteHandler =  await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&limit=4&type=city&apiKey=${api}`, requestOptions);

      const autocompleteResult = await autocompleteHandler.json();

      return autocompleteResult;

   } catch(error) { 
      throw new Error(error);
   };
}

export default autocomplete;