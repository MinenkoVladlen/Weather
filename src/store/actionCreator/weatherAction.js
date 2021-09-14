import axios from 'axios'

const API_KEY = "dee40134b6901bcba10217a396166b1f";
const BASIC_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const SECOND_URL = `https://api.openweathermap.org/data/2.5/onecall?appid=${API_KEY}&exclude=daily`

export const getDataWeather = data => {
	return dispatch => {
		dispatch(statusLoader(true))
		const getDataWeather = async data => {
			let getAlreadyUsedCities = JSON.parse(localStorage.getItem('select_user_cities'));
			let getLanguage = JSON.parse(localStorage.getItem('lang'))
			let arrData = [];

			if (getAlreadyUsedCities) {
				let getCoord = {}
				let urlGetLong = '';

				await Promise.all(
					getAlreadyUsedCities.map(async item => {
						let objForCity = {};
						urlGetLong = `${BASIC_URL}&q=${item},ua&units=metric&cnt=10&lang=${getLanguage ? getLanguage : 'en'}`;
						await axios.get(urlGetLong).then( result => {
							objForCity = {
								main: result.data.main,
								sys: result.data.sys,
								name: result.data.name
							}
							getCoord = result.data.coord;
						})
						const urlGetHourly = `${SECOND_URL}&lat=${getCoord.lat}&lon=${getCoord.lon}&units=metric&lang=${getLanguage ? getLanguage : 'en'}`;
						await axios.get(urlGetHourly).then( res => {
							objForCity.curret = res.data.current;
							objForCity.hourly = res.data.hourly;
							arrData.push(objForCity)
						})
					})
				)
			} else if (data) {
				let objForCity = {};
				const url = `${BASIC_URL}&lat=${data.dataCoordinate.latitude}&lon=${data.dataCoordinate.longitude}&units=metric&cnt=10`;
				await axios.get(url).then(async result => {
					objForCity = {
						main: result.data.main,
						sys: result.data.sys,
						name: result.data.name
					}
					let getCoord = result.data.coord;
					let createArr = [result.data.name]
					localStorage.setItem('select_user_cities', JSON.stringify(createArr))
					const urlGetHourly = `${SECOND_URL}&lat=${getCoord.lat}&lon=${getCoord.lon}&units=metric&lang=${getLanguage ? getLanguage : 'en'}`;
					await axios.get(urlGetHourly).then(res => {
						objForCity.curret = res.data.current;
						objForCity.hourly = res.data.hourly;
						arrData.push(objForCity)
					})
				})
			}

			dispatch(getDataWeatherSuccess(arrData))
		}
		getDataWeather(data)
	}

}

export const getDataWeatherSuccess = data => ({
	type: 'FETCH_DATA_WEATHER',
	payload: data
})

export const statusLoader = status => ({
	type: 'LOADER_STATUS',
	payload: status
})
