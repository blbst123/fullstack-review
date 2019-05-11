const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const { save, retrieve } = require('../database/index.js');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  getReposByUsername(req.body.username, function(newRepo) {
    save(newRepo, function () {
      console.log("in app post");
      res.status(200).send();
    });
  });
});

app.get('/repos', function (req, res) {
  retrieve(function(data) {
    res.status(200).send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

