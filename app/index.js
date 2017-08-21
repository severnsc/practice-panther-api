const clients = require('./clients')
const matters = require('./matters')
const mailer = require('./mailer')
const users = require('./users')
const express = require('express')
const authenticate = require('./authenticate')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use('/clients/new', (req, res, next) => {
  
  authenticate.validateUser(req.body.userName, req.get('Authorization')).then((bool) => {
    if(bool){
      console.log("User authenticated!")
      next()
    }else{
      res.sendStatus(401)
    }
  })

})

app.post('/clients/new', (req, res) => {
  
  clients.createClient(req.body.client).then((client) => {
    res.status(201).json(client)
  }).catch((e) => {
    console.log(e)
    res.sendStatus(500)
  })

})

app.get('/clients', (req, res) => {

  clients.findClients(req.query).then((array) => {
    res.status(200).send(array)
  }).catch((e) => {
    console.log(e)
    res.sendStatus(400)
  })

})

app.post('/matter/new', (req, res) => {

  matters.createMatter(req.body).then((matter) => {
    res.status(201).json(matter)
  }).catch((e) => {
    console.log(e)
    res.sendStatus(500)
  })

})

app.get('/matters', (req,res) => {

  matters.findMatter(req.query).then((array) => {
    res.status(200).send(array)
  }).catch((e) => {
    console.log(e)
    res.sendStatus(400)
  })

})

app.post('/users/new', (req, res) => {

  users.createUser(req.body).then((user) => {
    res.status(201).json(user)
  }).catch((e) => {
    console.log(e)
    res.sendStatus(500)
  })

})

app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT)
  mailer.dailyEmailJob
})