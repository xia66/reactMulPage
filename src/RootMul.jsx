import React from 'react';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom';

export default class Root extends React.PureComponent {
    render() {
        return (
            <div id="root">
                root<br/>
                <a href='home/index.html'>home</a><br/>
                <a href='test/index.html'>test</a><br/>                
                <a href='user/index.html'>user</a>
            </div>
        );
    }
}
ReactDOM.render(<Root />, document.getElementById('root'));