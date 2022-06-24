import axios from "axios"

class HelloWorldService{
    executeHelloWordService(){
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world');
    }

    executeHelloWordBeanService(){
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHelloWordPathVariableService(name){
        //console.log('executed service')
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`);
    }
}

export default new HelloWorldService()