require('dotenv').config()

const API_KEY = process.env.API_KEY

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.get('/currency', async (req, res) => {
  fetch('https://api.freecurrencyapi.com/v1/latest?base_currency=BRL&apikey=' + API_KEY)
    .then(response => response.json())
    .then(json => {
      res.send(json.data)
    })
})

const PORT = 5000

app.listen(PORT, () => {
  console.log('backend server started on port: ' + PORT)
})