const clients = require('./clients')
const matters = require('./matters')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/clients', (req, res) => {
  
  clients.createClient(req.body).then((client) => {
    res.status(201).json(client)
  }).catch((e) => {
    res.sendStatus(500)
  })

})

app.get('/clients', (req, res) => {

  clients.findClient({name: req.query.name}).then((array) => {
    res.status(200).send(array)
  }).catch((e) => {
    res.sendStatus(400)
  })

})

app.post('/matters', (req, res) => {

  matters.createMatter(req.body).then((matter) => {
    res.status(201).json(matter)
  }).catch((e) => {
    res.sendStatus(500)
  })

})

app.get('/matters', (req,res) => {

  matters.findMatter({name: req.query.name}).then((array) => {
    res.status(200).send(array)
  }).catch((e) => {
    res.sendStatus(400)
  })

})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})