require('dotenv').config()
const axios = require('axios').default

const getWeather = async (city) => {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_TOKEN}`
	try {
		const res = await axios.get(url)
		const { temp: temperature, humidity } = res.data.main
		return { temperature, humidity }
	} catch (error) {
		throw new Error(`That's not a real city dum-dums`)
	}
}

const getWeatherString = (temperature, humidity, city) => {
	return `The temperature in ${city} is ${temperature} ℃ and the humidity is ${humidity}%`
}

module.exports = { getWeather, getWeatherString }
