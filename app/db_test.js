const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

//Connection Url
const url = 'mongodb://localhost:27017/mydb';

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  console.log("Connected successfuly to the server")

  //Initialize insert object
  const obj = {
    'name': 'Chris',
    'age': 25
  }

  //Insert a single document
  db.collection('inserts').insertOne(obj, (err, r) => {
    assert.equal(null, err)
    assert.equal(1, r.insertedCount)
  })

  //Initialize collection
  const col = db.collection('inserts')

  //Get object back
  col.find({'name':'Chris'}.toArray((err, doc) => {
    assert.equal(null, err)
    assert.equal(1, doc.length)
  }))

  db.close()
});