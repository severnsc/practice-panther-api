const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
require('dotenv').config()
const url = process.env.MONGODB_URI;
const crypto = require('crypto')

const digestsMatch = (text, salt, digest) => {
  let bool = null
  bool = crypto.pbkdf2(text, salt, 10000, 32, 'sha512', (err, derivedKey) => {
    //async stuff
  })
  return bool
}

const validateUser = (userName, token) => {
  const foundUser = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    const col = db.collection('users')

    return col.findOne({userName: userName})

  }).then((user) => {

    //Check the digest against the token's digest with the salt

  }).catch((err) => {
    console.log(err)
  })

  return foundUser

}

module.exports.validateUser = validateUser