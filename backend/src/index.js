require('dotenv').config()

const API_KEY = process.env.API_KEY

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

var currencyData = null
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 1200000 // 20min
var isUpdating = false
var updatePromisse

function updateCurrencyData() {
  if (!isUpdating) {
    isUpdating = true
    updatePromisse = fetch('https://api.freecurrencyapi.com/v1/latest?base_currency=BRL&apikey=' + API_KEY)
      .then(response => response.json())
      .then(json => {
        console.log('[Updated currency data]')
        currencyData = {
          data: json.data,
          timestamp: Date.now()
        }

        isUpdating = false
        updatePromisse = null
      })

    return updatePromisse
  }

  return updatePromisse
}

app.get('/currency', async (req, res) => {
  if (currencyData == null) {
    updateCurrencyData().then(() => res.send(currencyData.data))
    return
  }

  if (currencyData.timestamp < Date.now() - UPDATE_INTERVAL) {
    updateCurrencyData().then(() => res.send(currencyData.data))
    return
  }

  console.log('[Cached data sent ' + Date.now() + ' ]')
  res.send(currencyData.data)
})

const PORT = 5000

app.listen(PORT, () => {
  console.log('backend server started on port: ' + PORT)
})