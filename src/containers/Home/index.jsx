import React from 'react';
import './index.less';
import ReactDOM from 'react-dom';
import {NavLink} from 'react-router-dom'

export default class Home extends React.PureComponent {
    clickHandle(event){
        console.log(event)
    }
    searchHandle(value){
        console.log(value);
    }
    render() {
        return (
            <div id="home" onClick={this.clickHandle}>
                home
                <Test onSearch={(value) => {this.searchHandle(value)}}/>
            </div>
        );
    }
}
class Test extends React.Component {
    constructor(props, context) {
        super(props,context);
        this.state = {
            value: ''
        }
    }
    //这里是实现一下事件包装，在外部引用这个组件的onsearch事件其实内部是用其他事件实现的这个包装事件
    onClickHandle(e){
        e.stopPropagation();
        this.props.onSearch(this.state.value);
    }
    render() {
        return(
            <input type="text" onClick={(event)=>this.onClickHandle(event)} onChange={ (e)=>{this.setState({value:e.target.value})} } value={this.state.value}/>
        )
    }
}
ReactDOM.render(<Home />, document.getElementById('root'));