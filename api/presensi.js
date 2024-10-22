require('dotenv').config()

const http = require('http')
const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios').default

axios.defaults.headers['User-Agent'] = '@m!k0mXv=#neMob!le'

app.use(bodyParser.json())
app.options('/*', (req, res) => {
  // console.log(req.url)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(204)
})

app.post('/*', async (req, res) => {
  // console.log(req.body)
  // console.log(process.env.API_KEY)
  await axios
    .post(
      'http://202.91.9.14:6000/api/v1.2/presensi_mobile/validate_ticket',
      req.body,
      {
        headers: {
          'X-Api-Key': process.env.API_KEY,
          'Content-Type': 'application/json',
          Host: '202.91.9.14:6000',
        },
        httpAgent: new http.Agent({ keepAlive: true }),
      }
    )
    .then((response) => {
      res.status(response.status)
      res.send(response.data)
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        res.status(error.response.status)
        res.send(error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request.data)
        res.status(204).send(JSON.stringify({ message: '' }))
      } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).send(JSON.stringify({ message: 'Error' }))
        // console.log('Error', error.response.data.message)
      }
    })
})

module.exports = app
