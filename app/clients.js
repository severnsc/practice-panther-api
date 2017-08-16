const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
require('dotenv').config()
const url = process.env.URL;

let createClient = (client) => {
  MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('clients')

    //Get object back
    col.insertOne(client, (err, r) => {
      
      if(err){
        console.log(err)
      }

      assert.equal(1, r.insertedCount)
      console.log(r)

    })

    db.close()
  })
}

let findClient = (obj) => {
  MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('clients')

    return col.find().toArray()
  }).then((items) => {
    res.send(items)
  })
}

module.exports.createClient = createClient
module.exports.findClient = findClient