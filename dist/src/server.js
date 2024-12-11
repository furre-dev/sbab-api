const express = require('express')
const rates = require('../../bankRates.json')
const app = express()
const PORT = 3000
app.get('/', (req, res) => {
  res.json(rates)
})
app.listen(PORT, () => {
  console.log('App is listening!')
})
