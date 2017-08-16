const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
require('dotenv').config()
const url = process.env.URL;

let createClient = (client) => {
  const createdClient = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('clients')

    //Get object back
    return col.insertOne(client).then((result) => {
      assert.equal(1, result.insertedCount)
      return result.ops[0]
    }).catch((e) => {
      console.log(e)
    })

    db.close()
  }).catch((e) => {
    console.log(e)
  })

  return createdClient

}

let findClient = (obj) => {
  const foundClients = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('clients')

    return col.find(obj).toArray()

  }).catch((e) => {
    console.log(e)
  })

  return foundClients
}

module.exports.createClient = createClient
module.exports.findClient = findClient