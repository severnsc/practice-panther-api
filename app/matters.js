const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
require('dotenv').config()
const url = process.env.MONGODB_URI;

let createMatter = (matter) => {
  
  const createdMatter = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('matters')

    //Add date created to the matter
    matter.dateCreated = new Date()

    return col.insertOne(matter).then((result) => {
      assert.equal(1, result.insertedCount)
      return result.ops[0]
    }).catch((e) => {
      console.log(e)
    })

    db.close()
  }).catch((e) => {
    console.log(e)
  })

  return createdMatter

}

let findMatter = (obj) => {

  const foundMatters = MongoClient.connect(url).then((db) => {

    console.log("Connected successfuly!")

    //Initialize collection
    const col = db.collection('matters')

    return col.find(obj).toArray()

  }).catch((e) => {
    console.log(e)
  })

  return foundMatters

}

module.exports.createMatter = createMatter
module.exports.findMatter = findMatter