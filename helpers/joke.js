const axios = require('axios').default

const getJoke = async () => {
	const res = await axios.get(
		'https://v2.jokeapi.dev/joke/Any?format=txt&type=single'
	)
	if (res.status === 200) {
		return res.data
	}
}

module.exports = { getJoke }
