const date = document.querySelector('.date');

export const dateFormat = () => {
   // Create new Date object
   const dateObj = new Date();
   // Extract current day, month and year
   const day = dateObj.toLocaleDateString("en-GB", {day: 'numeric'})
   const month = dateObj.toLocaleDateString("en-GB", {month: 'long'})
   const year = dateObj.toLocaleDateString("en-GB", {year: 'numeric'})

   // Change date in DOM
   date.textContent = `${day}. ${month}, ${year}`;
}

export const cityNameFormat = (city) => {
   // Split string by words
   const words = city.split(' ');
   
   // Loop through array of words
   for (let i = 0; i < words.length; i++) {
      // Make first letter uppercase
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
   }

   return words.join(' ');
}

export const unixTimeFormat = (time, timezone) => {
   // Convert unix to miliseconds
   const miliseconds = time * 1000;
   // Offset timezone
   const timezoneOffset = (parseInt(timezone) / 3600) - 1;
   
   let newTime = '';
   // Create new date object using given miliseconds
   const dateObj = new Date(miliseconds);
   
   // Extract hours and minutes
   const hours = dateObj.toLocaleTimeString("en-GB", {hour12: false}).slice(0, 2)
   const minutes = dateObj.toLocaleTimeString("en-GB", {hour12: false}).slice(3, 5)

   // Check timezone
   if (timezoneOffset >= 0) {
      // Set new time
      newTime = `${hours - Math.abs(timezoneOffset)}:${minutes}`
   } else {
      newTime = `${hours - Math.abs(timezoneOffset)}:${minutes}`
   }
   
   return newTime;
}

