import React from 'react';
import './App.css';
import Query from './services/query';
import RepoList from './components/repo-list';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import YoutubeSearch from '@material-ui/icons/YoutubeSearchedFor';
class App extends React.Component{
  //
  //q.makeQuery('search');
  constructor(props){
      super(props);
      this.state = {
        query:"",
        repos:[],
        hasRetrieved:false,
        lastQuery:""
      };
      this.Q = new Query();
  }

  getRepos = async () => {
    let repos = await this.Q.makeQuery(this.state.query);
    console.log(repos);
    let query = this.state.query;
    this.setState({repos, hasRetrieved:true, lastQuery:query, query:""});
  }
  handleSearch = () => {

  }
  //build bar to take input to query api to get repos by query from github
  renderQueryBar = () => {
    return (
      <Paper className='get-repos-input-container'>
        <InputBase
          className='get-repos-input'
          placeholder="Query Github Repositories"
          inputProps={{ 'aria-label': 'Query Github Repositories' }}
          onKeyDown = {(e) => {
            this.setState({query:e.target.value})
            if(e.keyCode === 13){//on enter retrieve
              this.getRepos();
            }
          }}
        />
        <IconButton onClick={() => this.getRepos()} className='query-button' aria-label="search">
          <YoutubeSearch />
        </IconButton>
        <Divider className='divider' />
      </Paper>
    )
  }
  render(){
    let repos = this.state.repos;
    let hasRepos = (typeof(repos) === 'object' && Object.keys(this.state.repos).length > 0);
    let message = (this.state.hasRetrieved ? "No repos were found matching this query" : null);
    return (
      <div className="App">
        <div className='get-repos-container'>
          <this.renderQueryBar/>
        </div>
        {hasRepos === true ?

          <RepoList lastQuery={this.state.lastQuery} repos={this.state.repos}/>
          :
          message
        }
      </div>
    );
  }
}

export default App;
