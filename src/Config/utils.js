/*=================
  工具方法
 ==================*/

export function dateFormat(date, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) {
        return ''
    }
    if (typeof date === 'string') {
        date = new Date(date.replace(/-/g, '/'))
    }
    if (typeof date === 'number') {
        date = new Date(date)
    }
    let o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    };
    const week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

const hasOwn = {}.hasOwnProperty;

export function classNames() {
    let classes = [];

    for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i];
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(null, arg));
        } else if (argType === 'object') {
            for (let key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
}

class Dialog {
    constructor() {
        this._hasInsertCSS = !1;
        this.tpl = {
            _alerttpl: ['<div class="mod_dialog" ontouchmove="return false" id="js_mod_dialog" style="display:block;">', '<div class="dialog_mask">', '<div class="dialog_body">', '<h3 class="dialog_tit">%(title)</h3>', '<div class="dialog_cont">', '<p class="dialog_txt">%(message)</p>', "</div>", '<div class="dialog_operate">', "%(btnhtml)", "</div>", "</div>", "</div>", "</div>"].join(""),
            _btn: '<a class="dialog_btn dialog_btn_strong js-dialog-btn" href="javascript:;" data-type="%(type)"><span>%(btnname)</span></a>'
        };
        this.g_js_dialogCb = null;
    }

    _insertCSS() {
        this._hasInsertCSS = !0;
        let str = '.mod_dialog{display:none}.dialog_mask{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;display:-webkit-box;-webkit-box-pack:center;-webkit-box-align:center;background:rgba(0,0,0,.4)}.dialog_body{width:5.2rem;padding-top:15px;border-radius:10px;background:#ebebec}.dialog_tit{margin:0;line-height:22px;text-align:center;font-size:.32rem;font-weight:bold;color:#000}.dialog_cont{margin:.3rem 0;overflow:hidden;padding:0;}.dialog_txt{margin:0 10px 5px;line-height:.4rem;text-align:center;font-size:.28rem;color:#000}.dialog_txt a{text-decoration:none;color:#000}.dialog_operate{position:relative;display:-webkit-box}.dialog_operate:before{content:"";position:absolute;top:0;left:0;right:0;z-index:1;height:1px;background:#cccccc}.dialog_operate .dialog_btn{display:block;-webkit-box-flex:1;position:relative;height:.88rem;line-height:.88rem;text-decoration:none;text-align:center;font-size:.3rem;color:#157efb;-webkit-tap-highlight-color:rgba(0,0,0,0)}.dialog_operate .dialog_btn:nth-child(2):before{content:"";position:absolute;left:0;top:0;bottom:0;z-index:1;width:1px;background:#cccccc}.dialog_operate .dialog_btn span{display:inline-block;width:120px}.dialog_operate .dialog_btn_strong{font-weight:bold}@media only screen and (-webkit-min-device-pixel-ratio:1.5){.dialog_operate:before{-webkit-transform:scaleY(.5)}.dialog_operate .dialog_btn:nth-child(2):before{-webkit-transform:scaleX(.5)}}',
            style = document.createElement("style");
        style.innerHTML = str, document.head.appendChild(style), style = null;
    }

    _toHTML(str, data) {
        return str.replace(/%\(([A-Za-z0-9_|.]+)\)/g, function (m, m1) {
            return m1 in data ? data[m1] : ""
        })
    }

    _close() {
        let dom = document.getElementById("js_mod_dialog");
        dom && (document.body.removeChild(dom), dom = null)
    }

    g_js_dialog(type) {
        this._close(), "function" == typeof this.g_js_dialogCb && this.g_js_dialogCb(type)
    }

    alert(options) {
        this._hasInsertCSS || this._insertCSS(), this._close(), this.g_js_dialogCb = null;
        let cfg = {
            title: "温馨提示",
            message: "",
            btn: "我知道了",
            cb: null
        };
        if (options instanceof Object)
            for (let o in options) cfg[o] = options[o];
        else cfg.message = options + "";

        cfg.btnhtml = this._toHTML(this.tpl._btn, {
            type: 0,
            btnname: cfg.btn
        });
        let html = this._toHTML(this.tpl._alerttpl, cfg);

        let _this = this;
        this.g_js_dialogCb = cfg.cb, document.body.insertAdjacentHTML("beforeEnd", html);
        document.querySelector(".mod_dialog .js-dialog-btn").addEventListener("click", function (e) {
            e.preventDefault();
            let type = parseInt(this.getAttribute("data-type")) || 0;
            _this.g_js_dialog(type)
        })
    }

    confirm(options) {
        this._hasInsertCSS || this._insertCSS(), this._close(), this.g_js_dialogCb = null;
        let cfg = {
            title: "温馨提示",
            message: "",
            btn: ["取消", "确定"],
            cb: null
        };
        if (options instanceof Object)
            for (let o in options) cfg[o] = options[o];
        else cfg.message = options + "";

        cfg.btnhtml = this._toHTML(this.tpl._btn, {
            type: 0,
            btnname: cfg.btn[0]
        }), cfg.btnhtml += this._toHTML(this.tpl._btn, {
            type: 1,
            btnname: cfg.btn[1]
        });
        let html = this._toHTML(this.tpl._alerttpl, cfg);

        let _this = this;
        this.g_js_dialogCb = cfg.cb, document.body.insertAdjacentHTML("beforeEnd", html);
        let btns = document.querySelectorAll(".mod_dialog .js-dialog-btn");
        let clickHandler = function (e) {
            e.preventDefault(), _this.g_js_dialog(parseInt(this.getAttribute("data-type")) || 0)
        };
        btns[0].addEventListener("click", clickHandler, false);
        btns[1].addEventListener("click", clickHandler, false);
    }
}

const dialog = new Dialog;
export const webAlert = dialog.alert.bind(dialog);
export const webConfirm = dialog.confirm.bind(dialog);
