import React from 'react';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.getTop25 = this.getTop25.bind(this);
  }

  getTop25() {
    let sortRepos = this.props.repos.sort(function (a, b) {
      return b.stargazers_count - a.stargazers_count;
    })

    return sortRepos.slice(0, 25);
  }

  render() {
    let topRepos = this.getTop25().map(function (repo) {
      return (
        <div key ={repo.id} className="repoDiv">
          <a href={repo.html_url} target="_blank" className="repoName">Repo Name: {repo.name}</a>
          <a href={repo.owner_url} target="_blank" className="repoOwner field">{repo.owner_login}</a>
          <p className="repoDescription field">Description{repo.description || 'null'}</p>
          <p className="repoStarCount field">{repo.stargazers_count}</p>
        </div>
      )
    });

    return (
      <div className="repoContainer">
        {topRepos}
      </div>
    );
  }
}

export default RepoList;