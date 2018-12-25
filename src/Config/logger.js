/*
日志输出工具
 */
import { dateFormat } from './utils';

const format = function () {
    let pivot = 1,
        args = arguments;
    return args[0].replace(/%[sdj%]/g, function (a) {
        switch (a) {
            case "%s":
                return String(args[pivot++]);
            case "%d":
                return Number(args[pivot++]);
            case "%j":
                return JSON.stringify(args[pivot++]);
            case "%%":
                return "%";
            default:
                return a
        }
    });
};

const formatMessage = msg => {
    let vArgs = [msg.tpl, msg.level, msg.moduleName, dateFormat(new Date(1 * msg.date), "YYYY-MM-DD HH:mm:ss")];
    for (let index = 0; index < msg.message.length; index++) vArgs.push(msg.message[index]);
    return format.apply(null, vArgs);
};

const output = {
    log(msg) {
        window.console && console.log && console.log(`%c${ formatMessage(msg) }`, 'color: #3296f0')
    },
    info(msg) {
        window.console && console.info && console.info(formatMessage(msg))
    },
    debug(msg) {
        window.console && console.log && console.log(`%c${ formatMessage(msg) }`, 'color: blue')
    },
    warn(msg) {
        window.console && console.warn && console.warn(formatMessage(msg))
    },
    error(msg) {
        window.console && console.error && console.error(formatMessage(msg))
    }
};

class Logger {
    constructor(opts) {
        opts = opts || {};
        this._moduleName = opts.moduleName || "Unknown";
        this._tmpl = opts.tmpl || "[%s][%s][%s] >>> %s";
        this._output = Object.assign({}, output, opts.output || {});
        this.buffer = [];
        this.capacity = 300;
    }

    _formatInfo(args, level) {
        args = Array.prototype.slice.call(args);
        let msg = {};
        return msg.moduleName = this._moduleName, msg.date = (new Date).getTime(), msg.message = args, msg.tpl = this._tmpl, msg.level = level, msg
    }

    log() {
        let msg = this._formatInfo(arguments, "LOG");
        this._writeLog(msg), this._check() && this._output.log(msg)
    }

    debug() {
        let msg = this._formatInfo(arguments, "DEBUG");
        this._writeLog(msg), this._check() && this._output.debug(msg)
    }

    info() {
        let msg = this._formatInfo(arguments, "INFO");
        this._writeLog(msg), this._check() && this._output.info(msg)
    }

    warn() {
        let msg = this._formatInfo(arguments, "WARN");
        this._writeLog(msg), this._check() && this._output.warn(msg)
    }

    error() {
        let msg = this._formatInfo(arguments, "ERROR");
        this._writeLog(msg), this._check() && this._output.error(msg)
    }

    setModuleName(moduleName) {
        return this._moduleName = moduleName, this
    }

    setTmpl(tmpl) {
        return this._tmpl = tmpl, this
    }

    _writeLog(msg) {
        msg && (this.buffer.length >= this.capacity && this.buffer.splice(0, 1), this.buffer.push(msg))
    }

    _check() {
        return window.LOGGER_ENABLED
    }
}

export default new Logger