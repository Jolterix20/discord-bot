const Discord = require('discord.js')
const _ = require('lodash')

const { getJoke } = require('./helpers/joke')
const { getWeather, getWeatherString } = require('./helpers/weather')

const client = new Discord.Client()

const BOT_PREFIX = '$'
const JOKE = 'joke'
const WEATHER = 'weather'

// BOT SETUP
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async (msg) => {
	let command = msg.content.split(' ')

	if (msg.author.bot) return

	if (command[0] === `${BOT_PREFIX}${WEATHER}`) {
		command.shift()
		let city = _.startCase(command.join(' '))

		try {
			const { temperature, humidity } = await getWeather(city)
			const weather = getWeatherString(temperature, humidity, city)
			msg.channel.send(weather)
		} catch (error) {
			msg.channel.send(error.message)
		}
	}

	if (command[0] === `${BOT_PREFIX}${JOKE}`) {
		const joke = await getJoke()
		msg.channel.send(joke)
	}
})

client.login(process.env.BOT_TOKEN)
