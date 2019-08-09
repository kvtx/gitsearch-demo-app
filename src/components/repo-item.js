import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Star from '@material-ui/icons/Star';
class RepoItem extends React.Component{
    render(){
        let repo = this.props.item;
        return(
            <div className='repo-item'>
                
                    <div className='repo-header'>
                        <Typography>
                            <span className='repo-rating'><Star/>{repo.stargazers_count}</span>
                            <span className='repo-title'><a href={repo.html_url}>{repo.name}</a></span>
                            {repo.language ? <span className='repo-lang'>{repo.language}</span> : null}
                           
                        </Typography>
                    </div>
                    {repo.description ? 
                        <div className='repo-desc'>
                            <Typography>
                                {repo.description}
                            </Typography>
                        </div>
                        :
                        null
                    }
                <Divider/>
            </div>
        )
    }
}
export default RepoItem;