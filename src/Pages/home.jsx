import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-weui';
import { bindActionCreators } from 'redux';
import * as HomeActionCreators from '../Redux/actions/homeActions';
import { loadCart } from '../Redux/actions/homeActions';
import { post } from '../Config/fetch';
import { API } from '../Config/ComStr';
import logger from '../Config/logger';
import { webAlert, webConfirm } from '../Config/utils';

import '../Style/index.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        logger.setModuleName('首页');
    }

    componentDidMount() {
        let { dispatch, addToCart } = this.props;
        dispatch(addToCart('water 100ml', 1, 250));
        post("/");
        dispatch(loadCart());
    }

    render() {

        let elements = this.props.cart.map((item, index) => (
            <li key={ index } style={ { background: "#eeeeee", margin: "1px 0px" } }>
                <h2>{ item.product }</h2>
                <div>{ item.quantity }</div>
            </li>
        ));

        const { addToCart } = this.props;

        return (
            <div>
                <ul>
                    { elements }
                </ul>
                <Button onClick={ addToCart.bind(this, 'Coffee 500gm', 1, 250) }>hello wechat</Button>
                <a href='#/login'>去login</a>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let { homeState } = state;
    return {
        cart: homeState.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        ...bindActionCreators(HomeActionCreators, dispatch),
        // addToCart: () => {
        //     dispatch(addToCart('Coffee 500gm', 1, 250));
        // }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);