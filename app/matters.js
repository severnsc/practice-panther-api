const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
require('dotenv').config()
const url = process.env.URL;

let createMatter = (matter) => {
  
  MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('matters')

    col.insertOne(matter, (err, r) => {

      if(err){
        console.log(err)
      }

      assert.equal(1, r.insertedCount)
      console.log(r)
    })

    db.close()
  })

}

let findMatter = (obj) => {

  const foundMatters = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('matters')

    return col.find(obj).toArray()

  })

  return foundMatters

}

module.exports.createMatter = createMatter
module.exports.findMatter = findMatter