import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { render } from 'react-dom';
import { Toast, Toptips } from 'react-weui';
import store from './Redux/store';
import router from './Router/router';

import initReactFastclick from 'react-fastclick';
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './Style/comm.scss';

initReactFastclick();

// console.log("initial state: ", store.getState());

let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

render(
    <div>
        <Provider store={ store }>
            { router }
        </Provider>
        <Toast icon="loading" id="js_loading">Loading...</Toast>
        <Toptips type="primary" id="js_toptips"> Thanks for coming! </Toptips>
    </div>,
    document.getElementById('root')
);
