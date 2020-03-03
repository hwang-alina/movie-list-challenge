require('dotenv').config()
const express = require('express')
const favicon = require('express-favicon')
const fetch = require('node-fetch')
const app = express()
const cors = require('cors')
const path = require('path')
const port = 8080

app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.get('/ping', function(req, res) {
  return res.send('pong')
})

app.get('/api/search', async (req, res) => {
  const { query } = req
  try {
    const page = `page=${req.query.page}`
    const searchParameter = `s=${req.query.s}`
    const titleParameter = `i=${req.query.i}`

    let requestURL = ''

    if ('i' in query) {
      requestURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&type=movie&${titleParameter}`
    } else if ('s' in query) {
      requestURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&type=movie&${searchParameter}&${page}`
    }

    if (requestURL === null) {
      return res.status(400).json({
        success: false,
        message: 'Required parameters are not provided',
      })
    }
    const response = await fetch(requestURL)
    const json = await response.text()

    const results = JSON.parse(json)

    return res.json({
      success: true,
      results,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})

app.listen(port)
