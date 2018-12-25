export const ComStr = {
    str: '一些全局参数,可以放这里'
};

export const Env = {
    HOST_CONFIGS: {
        "vue-ys.yst-dev.ysepay.cn": {
            env: 'dev'
        },
        "qrtest.ysepay.com": {
            env: 'pre',
            beta: true
        },
        "qr.ysepay.com": {
            env: 'pro'
        }
    }
};

const current_env = Env.HOST_CONFIGS[window.location.hostname];
const env = current_env ? current_env.env : "dev";
// 启用logger
window.LOGGER_ENABLED = env === "dev";

export const API = {
    dev: {
        url: 1
    },
    pre: {},
    pro: {}
}[env];
