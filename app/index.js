const clients = require('./clients')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/clients', (req, res) => {
  
  clients.createClient(req.body)

  res.sendStatus(200)

})

app.get('/clients', (req, res) => {

  clients.findClient({name: req.query.name}).then((array) => {
    res.send(array)
  })

})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})