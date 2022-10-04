require('dotenv').config()
const Discord = require('discord.js')
const fetch = require('node-fetch')
const _ = require('lodash')

const client = new Discord.Client()

const BOT_PREFIX = '$'
const JOKE = 'joke'
const WEATHER = 'weather'

// FUNCTIONS
function getJoke() {
	return fetch('https://v2.jokeapi.dev/joke/Any?format=txt&type=single').then(
		(res) => {
			return res.text()
		}
	)
}

function getWeather(city) {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_TOKEN}`
	return fetch(url)
		.then((res) => {
			return res.json()
		})
		.then((json) => {
			temp = json.main.temp
			humidity = json.main.humidity
			return [temp, humidity]
		})
}

// BOT SETUP
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (msg) => {
	let command = msg.content.split(' ')
	const trigger = command[0]

	if (msg.author.bot) return

	if (command[0] === `${BOT_PREFIX}${WEATHER}`) {
		const pre = command.shift()
		let city = _.startCase(command.join(' '))
		// console.log(city)
		getWeather(city) // Returns a Promise
			.then((res) => {
				;[temp, humidity] = res
				msg.reply(
					`The temperature in ${city} is ${temp} ℃ and the humidity is ${humidity}%`
				)
			})
			.catch((err) => {
				// console.log(err)
				msg.reply("That's not a real city dum-dums")
			})
	}

	if (command[0] === `${BOT_PREFIX}${JOKE}`) {
		getJoke()
			.then((joke) => msg.channel.send(joke))
			.catch((err) => {
				// console.log(err)
				msg.channel.send('Try again in a while')
			})
	}
})

client.login(process.env.BOT_TOKEN)
