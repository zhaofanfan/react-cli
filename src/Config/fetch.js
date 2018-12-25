import fetch from 'isomorphic-fetch'
/*=================
  工具方法
 ==================*/

export const showToast = (_sText) => {
    const jsToptip = document.getElementById("js_toptips");
    if (jsToptip.style.display === 'none') {
        jsToptip.innerHTML = _sText;
        jsToptip.style.display = "block";

        setTimeout(function () {
            jsToptip.style.display = 'none';
        }, 2000);
    }
};

export const showPopLoading = (_bFlag) => {
    const jsWrapper = document.getElementById("js_loading");
    const jsLoader = jsWrapper.parentNode;
    jsLoader.style.display = _bFlag ? "block" : "none";
};

export const jsonToQuery = (json) => {
    let key, value, ret = [];
    for (key in json) {
        key = encodeURIComponent(key);
        value = json[key];
        if (value && value.constructor === Array) {
            let queryValues = [];
            for (let i = 0, len = value.length, val; i < len; i++) {
                val = value[i];
                queryValues.push(key + '=' + encodeURIComponent(!val ? '' : String(val)));
            }
            ret = ret.concat(queryValues);
        } else {
            ret.push(key + '=' + encodeURIComponent(!value ? '' : String(value)));
        }
    }
    return ret.join('&');
};

export default function request(url, { body = '', method = 'GET', successfn, ...rest }) {
    method = method.toUpperCase();
    if (method === 'GET' && body) {
        body = jsonToQuery(body);
        if (url.indexOf("?") !== -1) {
            url = `${ url }&${ body }`;
        } else {
            url = `${ url }?${ body }`;
        }
        body = undefined;
    } else {
        body = body && JSON.stringify(body);
    }
    if (!rest || typeof rest.showLoading === "undefined")
        showPopLoading(!0);

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body
    }).then((res) => {
        showPopLoading();
        if (res.status >= 200 && res.status < 300) {
            return res.json();
        } else {
            return Promise.reject('请求失败！');
        }
    }).then(res => {
        if (res.code === "0000") {
            successfn(res);
        } else {
            showToast(res.msg || "");
        }
    }).catch(error => {
        console.log('  .........   fetch error failed', error)
    });
}

export const get = (url, opts) => request(url, { ...opts, method: 'GET' });
export const post = (url, opts) => request(url, { ...opts, method: 'POST' });
