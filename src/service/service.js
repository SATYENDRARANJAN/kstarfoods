import axios from 'axios'
import {axiosInstance}  from './axiosservice'
import config from './../config.json' 

class Service{
    constructor(){
        let service = axios.create({
            baseURL : config.BASE_URL,
            // headers: { "Access-Control-Allow-Origin":"*" },
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json'
                },
            timeout :1000,    
        })

        service.interceptors.response.use(this.handleSuccess,this.handleError);
        this.service = service;
    }


    handleSuccess(response){
        return response
    }
    handleError = (error) =>{
        switch(error.response.status){
            case 401:
                this.redirectTo(document,'/')
                break;
            case 404:
                this.redirectTo(document,'/404')
                break;
            default: 
                this.redirectTo(document,'/500') 
                break;
        }
        return Promise.reject(error)
    }

    redirectTo = (document,path)=>{
        document.location =path
    }

    get(path, callback) {
        return this.service.get(path).then(
          (response) => callback(response.status, response.data)
        );
      }
    
      patch(path, payload, callback) {
        return this.service.request({
          method: 'PATCH',
          url: path,
          responseType: 'json',
          data: payload
        }).then((response) => callback(response.status, response.data));
      }
    
      post(path, payload, callback) {
        return this.service.request({
          method: 'POST',
          url: path,
          responseType: 'json',
          data: payload
        }).then((response) => callback(response.status, response.data));
      }
    }
    
    export default new Service;
