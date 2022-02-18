import axios from 'axios';
import config from './config';

export default (function () {
    if (config.backUrl) {
        console.log('AppConfig with backURL:',config.backUrl);
        return axios.create({withCredentials: true, baseURL: config.backUrl});
    } else {
        console.log('AppConfig without backURL');
        return axios.create({withCredentials: true});
    }
})();
