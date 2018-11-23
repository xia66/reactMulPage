//引入antd样式
//这里注意把antd的样式文件放最上面，这样才能修改antd的样式
//import 'antd/dist/antd.css';
//引入公共样式
import '$Static/common.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,BrowserRouter,Route,Switch,NavLink} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'; 
//import {reducer} from './reducer/index.jsx'
import Home from '$Containers/Home'
import User from '$Containers/User'

class App extends React.Component{
    render(){
        //console.log($('<div></div>'));
        return (
            //HashRouter匹配的是#/后的url
            //Switch是从上往下的匹配第一个
            <HashRouter>
                <Switch>
                    {/*
                    如果路径后面不加参数就无法匹配到home，导致空页面
                    <Route exact path="/" component={Home}/>
                    */}
                    <Route exact path="/" component={Home}/>
                    <Route path="/user=:tel" component={User} />
                </Switch>
            </HashRouter>
        )
    }
}
ReactDOM.render((
    <App/>
), document.getElementById('root'));
