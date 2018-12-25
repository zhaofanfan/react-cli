// src/actions/homeActions.js

export const ADD_TO_CART = 'ADD_TO_CART';

export function addToCart(product, quantity, unitCost) {
    return {
        type: ADD_TO_CART,
        payload: { product, quantity, unitCost }
    }
}

export function loadCart(userId) {
    // 用 thunk 中间件解释：
    return function (dispatch, getState) {
        let { homeState } = getState();

        dispatch({
            type: ADD_TO_CART,
            payload: {}
        });

        // 异步分发原味 action

    }
}