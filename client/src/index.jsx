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
    // this.setState = this.setState.bind(this);
    // this.setRepos = this.setRepos.bind(this);

    // this.getTopRepos();
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

    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} />
      <Search onSearch={this.search.bind(this)} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));