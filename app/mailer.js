require('dotenv').config()
require('./clients')
const helper = require('sendgird').mail;
const fromEmail = new helper.Email(process.env.FROM_EMAIL)
const toEmail = new helper.Email(process.env.TO_EMAIL)
const subject = 'Yesterday\'s Practice Panther Activity'
let mail = new helper.Mail(fromEmail, subject, toEmail)
let clientsString = ""

let date = new Date()
date.setDate(date.getDate() - 1)
findClients({dateCreated: {$gte: date}}).then((array) => {
  array.forEach((client) => {
    clientsString + "<li>" + client.name + "</li>"
  })
})
const content = new helper.Content('text/html', "<html><body><ul>" + clientsString + "</ul></body></html>")
mail.addContent(content)