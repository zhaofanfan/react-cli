import React from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import AuthRouter from '../Component/common/AuthRouter';
import Home from '../Pages/home.jsx';
import Login from '../Pages/login.jsx';

/*=================
   router.jsx 组件
  专门用来管理路由的
==================*/

const RouteConfig = (
    <HashRouter>
        <Switch>
            <AuthRouter exact path="/login" component={ Login } skipAuth="true" title="登录"/>
            <AuthRouter exact path='/' component={ Home } skipAuth="true" title="运营管理系统"/>
        </Switch>
    </HashRouter>
);

export default RouteConfig
