import superagent from 'superagent';
import globalConfig from "./config";
// import Logger from '../common/js/Logger';

// let logger = new Logger('Ajax');

/**
 * 内部方法, 在superagent api的基础上, 包装一些全局的设置
 *
 * @param method 要请求的方法
 * @param url 要请求的url
 * @param params url上的额外参数
 * @param data 要发送的数据
 * @param headers 额外设置的http header
 * @returns {Promise}
 */
function requestWrapper(method, url, data, params) {
    // logger.debug('method=%s, url=%s, params=%o, data=%o, headers=%o', method, url, params, data);
    return new Promise((resolve, reject) => {
        const tmp = superagent(method, url);
        // 跨域请求
        tmp.withCredentials();
        // 设置全局的超时时间
        if (globalConfig.api.timeout && !isNaN(globalConfig.api.timeout)) {
            tmp.timeout(globalConfig.api.timeout);
        }
        // 默认的Content-Type和Accept

        tmp.set('Access-Control-Allow-Origin', '*');
        tmp.set('Access-Control-Allow-Credential', 'true');
        tmp.set('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS');
        // url中是否有附加的参数?
        if (method == 'GET') {
            tmp.set('Accept', 'application/json');
            tmp.query(params);
        }
        // body中发送的数据?
        if (method == 'POST') {
            tmp.set('Content-Type', 'application/x-www-form-urlencoded');
            tmp.send(data);
        }
        // 包装成promise
        tmp.end((err, res) => {
            // logger.debug('err=%o, res=%o', err, res);
            // 我本来在想, 要不要在这里把错误包装下, 即使请求失败也调用resolve, 这样上层就不用区分"网络请求成功但查询数据失败"和"网络失败"两种情况了
            // 但后来觉得这个ajax方法是很底层的, 在这里包装不合适, 应该让上层业务去包装
            if (res && res.body) {
                resolve(res.body);
            } else {
                reject(err || res);
            }
        });
    });
}

//客户
export const getCustomersByPage = params => {
    return requestWrapper('GET', `${globalConfig.getAPIPath()}${globalConfig.customer.getCustomerList}`, null, params);
};
export const delCustomer = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.customer.delCustomer}`, data, null);
};

// get ipHost
export const getIpHost = params => {
    return requestWrapper('GET', `http://ip.ws.126.net/ipquery`, null, params);
};

//用户
export const requestLogin = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.user.validate}`, data, null);
};


export const getUserListPage = params => {
    return requestWrapper('GET', `${globalConfig.getAPIPath()}${globalConfig.user.getUserList}`, null, params);
};

export const removeUser = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.user.delUser}`, data, null);
};

export const batchRemoveUser = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.user.batchremove}`, data, null);
};

export const addUser = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.user.addUser}`, data, null);
};


export const getBingPic = params => {
    return requestWrapper('POST', `http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1`, null);
};


//任务列表

export const getJobListPage = data => {
    return requestWrapper('GET', `${globalConfig.getAPIPath()}${globalConfig.job.getJobList}`, null, data);
};
export const editJob = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.job.editJob}`, data, null);
};
export const pauseJob = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.job.pauseJob}`, data, null);
};
export const resumeJob = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.job.resumeJob}`, data, null);
};
export const addJob = data => {
    return requestWrapper('POST', `${globalConfig.getAPIPath()}${globalConfig.job.addJob}`, data, null);
};

