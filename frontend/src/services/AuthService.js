import api from "../utils/api";


export default class AuthService {
    constructor(){
        this.axios = api;
    }

    async login(payload){
        const {data} = await this.axios.post(`/login/candidato`, payload);
        if (data) return data;
        return false;
    }
}