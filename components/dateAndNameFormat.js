const date = document.querySelector('.date');

export const dateFormat = () => {
   const dateObj = new Date();
   const day = dateObj.toLocaleDateString("en-GB", {day: 'numeric'})
   const month = dateObj.toLocaleDateString("en-GB", {month: 'long'})
   const year = dateObj.toLocaleDateString("en-GB", {year: 'numeric'})

   date.textContent = `${day}. ${month}, ${year}`;
}

export const cityNameFormat = (city) => {
   const words = city.split(' ');

   for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
   }

   return words.join(' ');
}

export const unixTimeFormat = (time, timezone) => {
   const miliseconds = time * 1000;
   const timezoneOffset = (parseInt(timezone) / 3600) - 1;
   
   let newTime = '';
   const dateObj = new Date(miliseconds);
   
   const hours = dateObj.toLocaleTimeString("en-GB", {hour12: false}).slice(0, 2)
   const minutes = dateObj.toLocaleTimeString("en-GB", {hour12: false}).slice(3, 5)

   if (timezoneOffset >= 0) {
      newTime = `${hours - Math.abs(timezoneOffset)}:${minutes}`
   } else {
      newTime = `${hours - Math.abs(timezoneOffset)}:${minutes}`
   }

   
   
   return newTime;
}

