const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test_user11:<password>@gitrepos-jsvvf.mongodb.net/test?retryWrites=true');

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  owner_login: String,
  owner_id: Number,
  owner_url: String,
  html_url: String,
  description: String,
  stargazers_count: Number,
  watchers_count: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj, callback) => {
  var newRepo = new Repo(repoObj);
  newRepo.save(function(err, newRepo) {
    if (err) {
      if (err.code === 11000) {
        return console.log('Repo already uploaded');
      }
      return console.log("Error occurred saving new repo:", err)
    }
    console.log("Insert into Database successful");
    callback();
  })
}

let retrieve = function(callback) {
  Repo.find(function(err, repos) {
    console.log("GERe");
    let arrRepos = [];
    for (let i = 0; i < repos.length; i++) {
      arrRepos.push(repos[i]._doc)
    }
    callback(JSON.stringify(arrRepos));
  });
}

module.exports.save = save;
module.exports.retrieve = retrieve;