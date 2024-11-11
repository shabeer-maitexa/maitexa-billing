import axios from 'axios';
import { BaseUrl } from './Constants';

const axiosInstance = axios.create({
    baseURL: BaseUrl, 
    timeout: 10000,
    // headers: {
    //     'Content-Type': 'application/json',
    //     // You can set other headers here, like Authorization
    //     // 'Authorization': `Bearer ${your_token}`,
    // },
});

export default axiosInstance;