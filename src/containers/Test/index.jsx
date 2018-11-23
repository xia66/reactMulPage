import React from 'react';
import './index.less';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom'

export default class Test extends React.PureComponent {

    componentDidMount() {
        console.log(2);
    }

    render() {
        return (
            <div id="test">
                test
            </div>
        );
    }
}
ReactDOM.render(<Test />, document.getElementById('root'));