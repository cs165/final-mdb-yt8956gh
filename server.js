const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
async function main() {
  const DATABASE_NAME = 'final';
  const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;

  // The "process.env.MONGODB_URI" is needed to work with Heroku.
  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);

  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);
}

main();


async function onId(req, res) {
  const routeParams = req.params;
  const key = routeParams.key;

  res.sendFile(path.resolve(__dirname, 'public/id', 'dairy.html'));
}

app.get('/id/:IDkey', onId);


// async function getId(req, res) {
//   const routeParams = req.params;
//   const date = routeParams.date;
//   const month = routeParams.month;
//   const year = routeParams.year;
//
//   const collection = db.collection('date');
//   const query = {date:`${month}/${date}/${year}`};
//   console.log("query:" + query);
//
//   const response = await collection.findOne(query);
//
//   if(response!=null) {
//     console.log(response);
//     console.log("ID:"+response._id);
//     res.json({key:response._id,error:false});
//   }
//   else{
//     console.log("There is not any document matching the query !");
//     let error = {error:true};
//     res.json(error);
//   }
// }



async function getId(req, res) {
  const routeParams = req.params;
  const diaryID = parseInt(routeParams.diaryID, 10);

  const collection = db.collection('diary');
  const query = {number:diaryID};
  console.log(query);

  const response = await collection.findOne(query);

  if(response!=null) {
    console.log(response);
    console.log("ID:"+response._id);
    res.json({key:response._id,error:false});
  }
  else {
    console.log("There is not any journal document matching the query !");
    console.log("Server will create a new one!");

    await collection.insertOne(query, function(err,result){
      console.log(`ID of New Document is ${result.insertedId}`);
      res.json({key:result.insertedId,error:false});
    });
  }
}

app.get('/getId/:diaryID', getId);

async function getEntry(req, res) {
  const routeParams = req.params;

  const bookidQueue = routeParams.bookid;
  const dateQueue = routeParams.date;


  const collection = db.collection('entry');
  const query = {bookid:bookidQueue, date:dateQueue};
  console.log(query);

  const response = await collection.findOne(query);

  if(response!=null) {
    console.log(response);
    console.log("ID:"+response._id);
    res.json({text:response.text,error:false});
  }
  else {
    console.log("There is not any entry document matching the query !");
    console.log("Server will create a new one!");

    query.text="";

    await collection.insertOne(query, (err,result)=>{
      console.log(`ID of New Document is ${result.insertedId}`);
      res.json({text:"",error:false});
    });
  }
}

app.get('/getEntry/:bookid/:date', getEntry);


async function onPost(req, res) {
  const routeParams = req.params;
  const messageBody = req.body;

  console.log("POST Message Body:");
  console.log(messageBody);

  const collection = db.collection('entry');
  const query = {bookid:messageBody.bookid, date:messageBody.date};

  await collection.updateOne(query,{$set:{text:messageBody.text}},(err, res)=>{
    if (err) throw err;
    console.log("<1 entry updated>");
  });

  res.json({status:"successful"});
}

app.post('/setEntry', jsonParser, onPost);
