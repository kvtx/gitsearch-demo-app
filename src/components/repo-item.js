import React from 'react';

class RepoItem extends React.Component{
    render(){
        let repo = this.props.item;
        return(
            <li className='repo-item'>
                {repo.name}
            </li>
        )
    }
}
export default RepoItem;