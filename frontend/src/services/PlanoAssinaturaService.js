import api from "../utils/api";


export default class PlanoAssinaturaService {
    constructor(){
        this.axios = api;
    }

    async getPlans(){
        const {data} = await this.axios.get('/planos');
        if (data) return data;
        return false;
    }

    async applyPlans(payload){
        const {data} = await this.axios.post('/aplicarPlano', payload);
        if (data) return data;
        return false;
    }
    
}