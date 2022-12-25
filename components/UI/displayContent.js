import { variables } from '../variables'
import { unixTimeFormat } from '../dateAndNameFormat';
import airPolutionSearch from '../searchHandlers/airPolutionSearch';
import uvSearch from '../searchHandlers/uvIndexSearch';

const displayContent = async (res) => {
      animations();
      
      variables.mainTemp.textContent = `${Math.floor(res.weather.main.temp)}\xB0C`;
      variables.mainDescription.textContent = res.weather.weather[0].main;
      variables.mainTempIcon.src = `./icons/weather-icons/${res.weather.weather[0].icon.slice(0,2)}d.png`;

      displayWeekDays();
      variables.forecastIcon.forEach((el, i) => {
            el.src = `./icons/weather-icons/${res.forecast.icons[i]}`;
      });
      variables.forecastTemp.forEach((el, i) => {
            el.textContent = `${Math.floor(res.forecast.temp[i])}\xB0C`;
      });
      variables.forecastDescription.forEach((el, i) => {
            el.textContent = res.forecast.description[i];
      });


      variables.feelsLike.textContent = `${Math.floor(res.weather.main.feels_like)}\xB0C`;
      variables.humidity.textContent = `${Math.floor(res.weather.main.humidity)}%`;
      variables.sunset.textContent = unixTimeFormat(res.weather.sys.sunset, res.weather.timezone);

      variables.windArrow.style.transform = `translate(-50%, -50%) rotate(${res.weather.wind.deg + 180 }deg)`;
      variables.windSpeed.textContent = Math.ceil(res.weather.wind.speed);

      variables.pressureArrow.style.transform = `translate(-50%, -50%) rotate(${calculatePressureAngle(res.weather.main.pressure)}deg)`;
      variables.pressureText.textContent = Math.floor(res.weather.main.pressure);


      /* const uvIndex = await uvSearch(res.geoData);
      console.log(uvIndex);
      const uvIndexFloor = Math.floor(uvIndex);

      uvIndexScale(uvIndexFloor);

      variables.uvText.textContent = uvIndexFloor; */
          
      const airPolution = await airPolutionSearch(res.geoData);
      airPolution && displayAirColors(airPolution);

      precipitationSearch(res);
}

export default displayContent;




const calculatePressureAngle = (pressure) => ((pressure - 970) / (1050 - 970)) * 250 - 125;

const animations = () => {
      const transition = 'all 1s cubic-bezier(.32,0,.24,.99)';
      variables.windArrow.style.transition = transition;
      variables.pressureArrow.style.transition = transition;
      variables.uvDot.style.transition = transition;
   };   

const uvIndexScale = (uvIndex) => {
      if (uvIndex === 0) {
		variables.uvDot.style.left = '0%';
            variables.uvGrade.textContent = 'Low';
	} else if (uvIndex === 1) {
		variables.uvDot.style.left = '3%';
            variables.uvGrade.textContent = 'Low';
	} else if (uvIndex === 2) {
		variables.uvDot.style.left = '10%';
            variables.uvGrade.textContent = 'Low';
	} else if (uvIndex === 3) {
		variables.uvDot.style.left = '20%';
            variables.uvGrade.textContent = 'Moderate';
	} else if (uvIndex === 4) {
		variables.uvDot.style.left = '35%';
            variables.uvGrade.textContent = 'Moderate';
	} else if (uvIndex === 5) {
		variables.uvDot.style.left = '45%';
            variables.uvGrade.textContent = 'Moderate';
	} else if (uvIndex === 6) {
		variables.uvDot.style.left = '55%';
            variables.uvGrade.textContent = 'High';
	} else if (uvIndex === 7) {
		variables.uvDot.style.left = '65%';
            variables.uvGrade.textContent = 'High';
	} else if (uvIndex === 8) {
		variables.uvDot.style.left = '72%';
            variables.uvGrade.textContent = 'Very High';
	} else if (uvIndex === 9) {
		variables.uvDot.style.left = '78%';
            variables.uvGrade.textContent = 'Very High';
	} else if (uvIndex === 10) {
		variables.uvDot.style.left = '85%';
            variables.uvGrade.textContent = 'Very High';
	} else if (uvIndex >= 11) {
		variables.uvDot.style.left = '93%';
            variables.uvGrade.textContent = 'Extreme';
	}
};

const displayWeekDays = () => {
      const daysInWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const date = new Date().getDay();

      let dayCnt = 7;
      let dateCnt = 0;

      variables.forecastDay.forEach((el, i) => {
            el.textContent = `${date > dayCnt - 1 ? daysInWeek[date - dayCnt] : daysInWeek[date + dateCnt]}`;
            dayCnt--;
            dateCnt++;
      });
};

const displayAirColors = (element) => {
      const colors = {
            'air-good-bg': '#DDF5E7',
            'air-good-text': '#17B784',
            'air-moderate-bg': '#FAD568',
            'air-moderate-text': '#A78135',
            'air-unhealthySensitive-bg': '#FF9A5D',
            'air-unhealthySensitive-text': '#B75B2F',
            'air-unhealthy-bg': '#FD686E',
            'air-unhealthy-text': '#B52C3E',
            'air-veryUnhealthy-bg': '#A57DB6',
            'air-veryUnhealthy-text': '#654573',
            'air-hazardous-bg': '#A37684',
            'air-hazardous-text': '#6C4051'
      };

      variables.aqiNum.textContent = element.aqi.toFixed(1);


      if (element.aqi <= 50) {
           variables.airCondition.textContent = 'Good';
           variables.airCondition.style.color = colors['air-good-text'];
           variables.airIcon.style.stroke = colors['air-good-text'];
           variables.aqiText.style.color = colors['air-good-text'];
           variables.aqiNum.style.color = colors['air-good-text'];
           variables.aqiLine.style.backgroundColor = colors['air-good-text'];
           variables.aqiBg.style.backgroundColor = colors['air-good-bg'];
           variables.airDescription.textContent = 'Perfect day for a walk';
      } else if (element.aqi > 50 && element.aqi <= 100) {
            variables.airCondition.textContent = 'Moderate';
            variables.airCondition.style.color = colors['air-moderate-text'];
            variables.airIcon.style.stroke = colors['air-moderate-text'];
            variables.aqiText.style.color = colors['air-moderate-text'];
            variables.aqiNum.style.color = colors['air-moderate-text'];
            variables.aqiLine.style.backgroundColor = colors['air-moderate-text'];
            variables.aqiBg.style.backgroundColor = colors['air-moderate-bg'];
            variables.airDescription.textContent = 'Sensitive groups should reduce outdoor exercise' 
      } else if (element.aqi > 100 && element.aqi <= 150) {
            variables.airCondition.textContent = 'Unhealthy for Sensitive Groups';
            variables.airCondition.style.color = colors['air-unhealthySensitive-text'];
            variables.airIcon.style.stroke = colors['air-unhealthySensitive-text'];
            variables.aqiText.style.color = colors['air-unhealthySensitive-text'];
            variables.aqiNum.style.color = colors['air-unhealthySensitive-text'];
            variables.aqiLine.style.backgroundColor = colors['air-unhealthySensitive-text'];
            variables.aqiBg.style.backgroundColor = colors['air-unhealthySensitive-bg'];
            variables.airDescription.textContent = 'Sensitive groups should reduce outdoor exercise' 
      } else if (element.aqi > 150 && element.aqi <= 200) {
            variables.airCondition.textContent = 'Unhealthy';
            variables.airCondition.style.color = colors['air-unhealthy-text'];
            variables.airIcon.style.stroke = colors['air-unhealthy-text'];
            variables.aqiText.style.color = colors['air-unhealthy-text'];
            variables.aqiNum.style.color = colors['air-unhealthy-text'];
            variables.aqiLine.style.backgroundColor = colors['air-unhealthy-text'];
            variables.aqiBg.style.backgroundColor = colors['air-unhealthy-bg'];
            variables.airDescription.textContent = 'Avoid outdoor exercise' 
      } else if (element.aqi > 200 && element.aqi <= 300) {
            variables.airCondition.textContent = 'Very Unhealthy';
            variables.airCondition.style.color = colors['air-veryUnhealthy-text'];
            variables.airIcon.style.stroke = colors['air-veryUnhealthy-text'];
            variables.aqiText.style.color = colors['air-veryUnhealthy-text'];
            variables.aqiNum.style.color = colors['air-veryUnhealthy-text'];
            variables.aqiLine.style.backgroundColor = colors['air-veryUnhealthy-text'];
            variables.aqiBg.style.backgroundColor = colors['air-veryUnhealthy-bg'];
            variables.airDescription.textContent = 'Wear a mask outdoors, and avoid outdoor exercise' 
      } else if (element.aqi > 300) {
            variables.airCondition.textContent = 'Hazardous';
            variables.airCondition.style.color = colors['air-hazardous-text'];
            variables.airIcon.style.stroke = colors['air-hazardous-text'];
            variables.aqiText.style.color = colors['air-hazardous-text'];
            variables.aqiNum.style.color = colors['air-hazardous-text'];
            variables.aqiLine.style.backgroundColor = colors['air-hazardous-text'];
            variables.aqiBg.style.backgroundColor = colors['air-hazardous-bg'];
            variables.airDescription.textContent = 'Everyone should aviod all outdoor exertion' 
      }
}