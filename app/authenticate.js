const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
require('dotenv').config()
const url = process.env.MONGODB_URI;
const users = require('./users')
const bcrypt = require('bcrypt')

const validateUser = async (userName, apiKey) => {

  const user = await users.findUser({userName: userName})

  const userValidated = bcrypt.compare(apiKey, user.digest).then((res) => {
    if(res){
      return true
    }else{
      false
    }
  })

  return userValidated

}

module.exports.validateUser = validateUser