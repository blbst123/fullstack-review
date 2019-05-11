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
        <div>
          <h4> Repo List Component </h4>
          <p>{repo.name}</p>
          <p>{repo.stargazers_count}</p>
        </div>
      )
    });

    return (
      <div>
        {topRepos}
      </div>
    );
  }
}

export default RepoList;