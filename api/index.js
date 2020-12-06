const http = require('http')
const bodyParser = require('body-parser')
const app = require('express')()
const axios = require('axios').default

axios.defaults.headers['User-Agent'] = '@m!k0mXv=#neMob!le'

app.use(bodyParser.json())
app.options('/*', (req, res) => {
  console.log(req.url)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200)
})

app.post('/login', async (req, res) => {
  await axios
    .get('http://mhsmobile.amikom.ac.id/login', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': 33,
        Host: 'mhsmobile.amikom.ac.id',
        'Accept-Encoding': 'gzip',
      },
      params: {
        username: req.body.nim,
        keyword: req.body.pass,
      },
      httpAgent: new http.Agent({ keepAlive: true }),
    })
    .then((response) => {
      res.status(response.status)
      res.send(response.data)
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.request._header)
        res.status(error.response.status)
        res.send(error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        res.status(204).send(JSON.stringify({ Message: '' }))
      } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).send(JSON.stringify({ Message: 'Error' }))
        console.log('Error', error.response.data.message)
      }
    })
})

app.post('/presensi', async (req, res) => {
  await axios
    .post(
      'http://202.91.9.14:6000/api/v1.2/presensi_mobile/validate_ticket',
      req.body,
      {
        headers: {
          'X-Api-Key': 'sGSCQUZTJlnwPOZuoSQLPXykISmNMDvPgsya',
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
        console.log(error.request.data)
        res.status(204).send(JSON.stringify({ message: '' }))
      } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).send(JSON.stringify({ message: 'Error' }))
        console.log('Error', error.response.data.message)
      }
    })
})

module.exports = app
