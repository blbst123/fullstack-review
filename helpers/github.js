const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(error, response, body) {
    var repoArr = JSON.parse(body)
    for (let i = 0; i < repoArr.length; i++) {
      let newRepo = {
        id: repoArr[i].id,
        name: repoArr[i].name,
        owner_login: repoArr[i].owner.login,
        owner_id: repoArr[i].owner.id,
        owner_url: repoArr[i].owner.url,
        html_url: repoArr[i].html_url,
        description: repoArr[i].description,
        stargazers_count: repoArr[i].stargazers_count,
        watchers_count: repoArr[i].watchers_count,
        forks: repoArr[i].forks
      }
      // console.log(newRepo);
      callback(newRepo);
    }
    // console.trace(repoArr.length);
  })

}

module.exports.getReposByUsername = getReposByUsername;