import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/Star';
class RepoItem extends React.Component{
    render(){
        let repo = this.props.item;
        return(
            <div className='repo-item'>
                <Typography>
                    <div className='repo-header'>
                        <span className='repo-title'><a href={repo.html_url}>{repo.name}</a></span>
                        <span className='repo-lang'>{repo.language}</span>
                        <span className='repo-rating'><Star/>{repo.stargazers_count}</span>
                    </div>
                </Typography>
                <Divider/>
            </div>
        )
    }
}
export default RepoItem;