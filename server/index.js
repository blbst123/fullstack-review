
// USING MONGODB
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const { getReposByUsername } = require('../helpers/github.js');
const { save, retrieve } = require('../database/index.js');
let port = 1128;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

 
app.post('/repos', function (req, res) {
  getReposByUsername(req.body.username, function(newRepo) {
    save(newRepo, function () {
      res.status(200).send();
    });
  });
});

app.get('/repos', function (req, res) {
  retrieve(function(data) {
    res.status(200).send(data);
  });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


/*
// USING MYSQL WITH SEQUELIZE
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const Repos = require('../models/model.js');
let port = 1128;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  let repoObj = {
    name: req.body.name,
    stars: req.body.stars
  }
  console.log('here');
  console.log(repoObj);

  Repos.create(repoObj)
    .then(() => {
      res.status(200).send();
    });

  // getReposByUsername(req.body.username, function(newRepo) {
  //   Repos.create(newRepo)
  //   .then(() => {
  //     res.status(200).send();
  //   });
  // });
});

app.get('/repos', function (req, res) {
  // Repos.findAll().then(repos => {
  //   res.status(200).send(repos);
  // });
  console.log("In get repos");
  res.status(200).send("In get repos");
});

app.get('/repos/:id', function (req, res) {
  Repos.findOne({
    where: { id: req.params.id }
  })
    .then(repo => {
      if (repo) {
        res.status(200).send(repo);
      } else {
        res.send("Repo does not exist");
      }
    })
    .catch(err => {
      res.send('error', err);
    });
});

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
*/