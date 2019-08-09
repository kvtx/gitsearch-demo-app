import React from 'react';
import RepoItem from './repo-item';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import SwapVert from '@material-ui/icons/SwapVert';
class RepoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortBy: 'score',
            repos:this.props.repos,
            totalCount:false,
            filteredRepos:this.props.repos,
            search:'',
        }
    }
    //sort on mount so we start off sorted
    componentDidMount(){
        this.sortRepos();
    }
    //check for updated props and update the state accordingly
    componentDidUpdate(){
        if(this.props.repos !== this.state.repos){
            this.setState({repos:this.props.repos,filteredRepos: this.props.repos, search:''});
        }
    }
    //set the sortby in state then sort repos accordingly
    setSort = (sortBy) => {
        this.setState({sortBy}, () => {this.sortRepos()});
    }
    //sort repos based on current selected sort method
    sortRepos = ()  => {
        let repos = this.state.filteredRepos;
        let sortBy = this.state.sortBy;
        if(sortBy !== false){
            this.setState({
                filteredRepos:repos.sort((a,b) => b[sortBy] -a[sortBy] )
            });
        }
    }
    //set search filter in state then trigger search
    setFilter = (search) => {
        this.setState({search}, () => this.filterRepos());
    }
    //filter repos based on search
    filterRepos = () => {
        let search = this.state.search.toLowerCase();
        this.setState({filteredRepos: this.state.repos.filter((repo) => {
            return ((repo.name.toLowerCase().indexOf(search) >= 0) ||
                ('language' in repo && repo.language && repo.language.toLowerCase().indexOf(search) >= 0) ||
                ('description' in repo && repo.description && repo.description.toLowerCase().indexOf(search) >= 0));
            })
        },
            () => {this.sortRepos()}
        );
    }
    //search repos returned by query
    renderRepoSearch = () => {
        return (
            <span className='search-repos-input-container'>
                <IconButton onClick={() => this.filterRepos()} className='query-button' aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                className='search-repos-input'
                placeholder="Search Repositories"
                value={this.state.search}
                inputProps={{ 'aria-label': 'Search Repositories' }}
                onChange= {(e) => {
                    this.setFilter(e.target.value);
                }}
                />
                {this.state.search.length > 0 ?
                <IconButton onClick={() => this.setFilter('')} className='query-button' aria-label="search">
                    <CloseIcon />
                </IconButton>
                : null
                }
                <Divider className='divider' />
            </span>
        )
    }
    render(){
        return(
            <Paper className='repo-list-container' component='div'>
                <div className='repo-list-header'>
                    <this.renderRepoSearch/>
                    <span className='sort-container'>
                        <SwapVert className='sort-icon'/>
                        <Select
                            value={this.state.sortBy}
                            onChange={(e) => this.setSort(e.target.value)}
                            >
                            <MenuItem value='score'>Relevance</MenuItem>
                            <MenuItem value='stargazers_count'>Stars</MenuItem>
                        </Select>
                    </span>
                </div>
                <div key={this.props.lastQuery} className='repo-list'>
                    {this.state.filteredRepos.map((repo) => {
                        return(
                            <RepoItem key={repo.id} item={repo}/>
                        )
                    })}
                </div>
            </Paper>
        )
    }
}


export default RepoList;