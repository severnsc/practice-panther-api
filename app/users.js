const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
require('dotenv').config()
const url = process.env.MONGODB_URI;
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const hash = async (string) => {

  return await bcrypt.hash(string, 10)

}

const findUser = (obj) => {
  const foundUser = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    const col = db.collection('users')

    return col.findOne(obj)

  })

  return foundUser

}

const createUser = (user) => {

  const createdUser = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('users')

    return findUser(user).then(async (foundUser) => {
      if(foundUser){
        return "Username already taken!"
      }else{
        //Generate crypto random apiKey
        const apiKey = crypto.randomBytes(48).toString('base64')

        //Hash the apiKey async
        user.digest = await hash(apiKey)

        console.log(user.digest)

        //Create the user
        return col.insertOne(user).then((result) => {

          assert.equal(1, result.insertedCount)

          //Only return the username and API Key
          return {userName: user.userName, apiKey: apiKey}
        }).catch((e) => {
        console.log(e)
        })
      }
    }).catch((e) => {
    console.log(e)
    })

  }).catch((e) => {
    console.log(e)
  })

  return createdUser

}

module.exports.findUser = findUser
module.exports.createUser = createUser