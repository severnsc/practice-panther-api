require('dotenv').config();
const clients = require('./clients');
const schedule = require('node-schedule');
const helper = require('sendgrid').mail;

const sendEmail = () => {
  const fromEmail = new helper.Email(process.env.FROM_EMAIL);
  const toEmail = new helper.Email(process.env.TO_EMAIL);
  const subject = 'Yesterday\'s Practice Panther New clients';
  const content = new helper.Content('text/plain', 'New Clients');
  const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  //Create new email helper
  let mail = new helper.Mail(fromEmail, subject, toEmail, content)
  //Will become the client list in the email HTML
  let clientsString = ""
  //Get today's date and then set it to yesterday
  let date = new Date()
  date.setDate(date.getDate() - 1)
  //Get any clients created in last 24 hours
  clients.findClients({dateCreated: {$gte: date}}).then((array) => {
    array.forEach((client) => {
      clientsString + "<li>" + client.name + "</li>"
    })
  })
  //Add client list to email HTML
  const htmlContent = new helper.Content('text/html', "<html><body><ul>" + clientsString + "</ul></body></html>")
  mail.addContent(htmlContent)
  //Setup for Sendgrid API POST request
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  })
  //Make the request, console log the response
  sg.API(request, (err, response) => {
    if(err){
      console.log('Error response received')
    }
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })
}
//Schedule the job to run every day at 8am
const dailyEmailJob = schedule.scheduleJob('8 * * * * *', sendEmail)
//Export the job to call it in the server's listen function
module.exports.dailyEmailJob = dailyEmailJob