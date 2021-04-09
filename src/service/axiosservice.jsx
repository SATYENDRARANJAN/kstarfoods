import axios from 'axios'
import config from './../config.json' 

export const axiosInstance = axios.create({
    baseURL : config.BASE_URL,
    timeout :1000,   
    headers:{'Authorization':localStorage.getItem('token')} 
})

const DEBUG = config.env === "development";

axios.interceptors.request.use((config) => {
    let access_token= localStorage.getItem('token')
    /** In dev, intercepts request and logs it into console for dev */
    if (DEBUG) { console.info("✉️ ", config); }
    config.headers = { 
        'Authorization': `${access_token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    return config;
}, (error) => {
    if (DEBUG) { console.error("✉️ ", error); }
    return Promise.reject(error);
});