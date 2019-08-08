import React from 'react';
import RepoItem from './repo-item';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class RepoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortBy: false,
            repos:this.props.repos
        }
    }
    setSort = (sortBy) => {
        this.setState({sortBy});
        this.sortRepos(sortBy);
    }
    sortRepos = (sortBy)  => {
        let repos = this.props.repos;
        if(sortBy !== false){
            this.setState({
                repos:repos.sort((a,b) => a[sortBy] - b[sortBy])
            })
        }
    }  
    render(){
        let repos = this.state.repos;
        let sortBy = this.state.sortBy;
        return(
            <div className='repo-list-container'>
                <Select
                    value={sortBy}
                    onChange={(value) => this.props.setSort(value)}
                    >
                    <MenuItem value='Relevance'>Relevance</MenuItem>
                    <MenuItem value='Stars'>Stars</MenuItem>
                </Select>
                <ul className='repo-list'>
                    {repos.map((repo) => {
                        return(
                            <RepoItem item={repo}/>
                        )
                    })}

                </ul>
            </div>
        )
    }
}


export default RepoList;