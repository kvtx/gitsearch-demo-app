import React from 'react';
import './App.css';
import Query from './services/query';
import RepoList from './components/repo-list';
import TextField from '@material-ui/core/TextField';
class App extends React.Component{
  //
  //q.makeQuery('search');
  constructor(props){
      super(props);
      this.state = {
        query:"",
        repos:[],
        hasRetrieved:false,
      };
      this.Q = new Query();
  }

  getRepos = async () => {
    let repos = await this.Q.makeQuery(this.state.query);
    console.log(repos);
    this.setState({repos, hasRetrieved:true});
  }
  render(){
    let repos = this.state.repos;
    let hasRepos = (typeof(repos) === 'object' && Object.keys(this.state.repos).length > 0);
    let message = (this.state.hasRetrieved ? "No repos were found matching this query" : null);
    return (
      <div className="App">
        <div className='get-repos-container'>
          <TextField
            label="Query github repos"
            className="get-repos-input"
            value={this.state.query}
            onChange={(e) => {this.setState({query:e.target.value})}}
            margin="normal"
            variant="outlined"
          />
          <button onClick={() => this.getRepos()}>Get Repos</button>
        </div>
        {hasRepos === true ? 
          <RepoList repos={this.state.repos}/>
          :
          message
        }
      </div>
    );
  }
}

export default App;
