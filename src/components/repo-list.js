import React from 'react';
import RepoItem from './repo-item';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SwapVert from '@material-ui/icons/SwapVert';
class RepoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortBy: 'score',
            repos:this.props.repos,
            filteredRepos:this.props.repos,
            search:'',
        }
    }
    componentDidMount(){
        this.sortRepos();
    }
    setSort = (sortBy) => {
        this.setState({sortBy});
        this.sortRepos(sortBy);
    }
    sortRepos = (sortBy)  => {
        let repos = this.props.repos;
        if(sortBy !== false){
            this.setState({
                repos:repos.sort((a,b) => b[sortBy] -a[sortBy] )
            })
        }
    }
    setFilter = (search) => {
        this.setState({search});
        this.filterRepos(search);
    }
    filterRepos = (search) => {
        let repos = this.state.repos;     
        search = search.toLowerCase();   
        if(search.length > 0){
            this.setState({
                filteredRepos:repos.filter((repo) => {
                    return repo.name.toLowerCase().indexOf(search) >= 0;
                })
            })
        }else{
            this.setState({
                filteredRepos:repos
            })
        }
        this.sortRepos();
    }
    renderRepoSearch = () => {
        //build bar to take input to query api to get repos by query from github
        return (
            <span className='search-repos-input-container'>
                <IconButton onClick={() => this.getRepos()} className='query-button' aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                className='search-repos-input'
                placeholder="Search Repositories"
                inputProps={{ 'aria-label': 'Search Repositories' }}
                onChange= {(e) => {
                    this.setFilter(e.target.value);
                }}
                />
                <Divider className='divider' />
            </span>
        )
    }
    render(){
        let repos = this.state.filteredRepos;
        let sortBy = this.state.sortBy;
        return(
            <Paper className='repo-list-container'>
                <div className='repo-list-header'>
                    <this.renderRepoSearch/>
                    <span className='sort-container'>
                        <SwapVert className='sort-icon'/>
                        <Select
                            value={sortBy}
                            onChange={(e) => this.setSort(e.target.value)}
                            >
                            <MenuItem value='score'>Relevance</MenuItem>
                            <MenuItem value='stargazers_count'>Stars</MenuItem>
                        </Select>
                    </span>
                </div>
                
                <div className='repo-list'>
                    {repos.map((repo) => {
                        return(
                            <RepoItem item={repo}/>
                        )
                    })}
                </div>
            </Paper>
        )
    }
}


export default RepoList;