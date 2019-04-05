const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(express.static('public'))

app.get('/employee/:id', function(req, res){
    console.log(req.params.id);
    var employeeNo = req.params.id;

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(employeeNo).find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
          if (err) throw err;
          // res.send(result);
          res.json(result);
          console.log("data sent");
          db.close();
        });
      });
});

app.listen(port, () => console.log(`Time Sheet app listening on port ${port}!`))