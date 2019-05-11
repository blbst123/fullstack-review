import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
    this.getTopRepos = this.getTopRepos.bind(this);
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: "POST",
      url: "/repos",
      contentType: "application/json",
      data: JSON.stringify({
        username: term
      }),
      success: () => {
        console.log("hererer in search success");
        this.getTopRepos();
      },
      error: function (err) {
        console.log('Error has occurred', err);
      }
    });
  }

  componentDidMount() {
    this.getTopRepos();
  }

  getTopRepos() {
    $.ajax({
      type: "GET",
      url: "/repos",
      contentType: "application/json",
      success: (repos) => {
        this.setState({
          repos: JSON.parse(repos)
        })
      },
      error: function (err) {
        console.log('Error has occurred', err);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <img src="Artboard.png" id="logo"/>
          <h1 className="title">Github Fetcher</h1>
          <button id="submit-btn">Submit Git</button>
        </div>
        <RepoList repos={this.state.repos} />
        <Search onSearch={this.search.bind(this)} />
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));