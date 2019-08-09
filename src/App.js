import React from 'react';
import './App.css';
import Query from './services/query';
import RepoList from './components/repo-list';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import YoutubeSearch from '@material-ui/icons/YoutubeSearchedFor';
class App extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        query:"",
        repos:[],
        hasRetrieved:false,
        lastQuery:"",
        searching:false,
      };
      this.Q = new Query();
  }
  getRepos = () => {
    this.setState({searching:true});
    this.Q.makeQuery(this.state.query).then((data) =>{
      let repos = data.items;
      let query = this.state.query;
      this.setState({repos, hasRetrieved:true, lastQuery:query, searching:false});
    });
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
            let keyCode = e.keyCode;
            this.setState({query:e.target.value}, () => {
                if(keyCode === 13){//on enter retrieve
                  this.getRepos();
                }
              });
            }
          }
        />
        <IconButton onClick={() => this.getRepos()} className='query-button' aria-label="search">
          <YoutubeSearch />
        </IconButton>
        <Divider className='divider' />
      </Paper>
    )
  }
  //build main app area: query bar and repo list with result title
  render(){
    let repos = this.state.repos;
    let hasRepos = (typeof(repos) === 'object' && Object.keys(this.state.repos).length > 0);
    let headerMessage = (this.state.searching ? `Fetching results for: ${this.state.query}` : `Showing results for: ${this.state.lastQuery}`);
    if(this.state.hasRetrieved === true && this.state.repos.length === 0){
      headerMessage = (this.state.query.length === 0 ?  "Query cannot be empty": `No repos were found matching ${this.state.query}`);
    }
    return (
      <div className="App">
        <div className='get-repos-container app-header'>
          <this.renderQueryBar/>
        </div>
        <div className='app-body'>
            {(this.state.searching || this.state.hasRetrieved) ?
              <Paper className='results'><Typography>{headerMessage}</Typography></Paper>
              : 
              null
            }
            {hasRepos === true ? 
              <RepoList lastQuery={this.state.lastQuery} repos={repos}/>
              : 
              null
            }
        </div>
      </div>
    );
  }
}

export default App;
