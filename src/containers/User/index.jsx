import React from 'react';
import './index.less';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom'

export default class User extends React.PureComponent {
    render() {
        return (
            <div id="user">
                users
            </div>
        );
    }
}
ReactDOM.render(<User />, document.getElementById('root'));