const clients = require('./clients')
const matters = require('./matters')
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

app.post('/matters', (req, res) => {

  matters.createMatter(req.body)

  res.sendStatus(200)

})

app.get('/matters', (req,res) => {

  matters.findMatter({name: req.query.name}).then((array) => {
    res.send(array)
  })

})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})