import api from "../utils/api";


export default class DevService {
    constructor(){
        this.axios = api;
    }

    async createDev(payload){
        const {data} = await this.axios.post('/candidatos', payload);
        if (data) return data;
        return false;
    }

    async getAllDev(){
        const {data} = await this.axios.get('/candidatos');
        if (data) return data;
        return false;
    }

    async getDevById(id){
        const {data} = await this.axios.get(`/candidatos/${id}`);
        if (data) return data;
        return false;
    }



    async updateDev(id, payload){
        const {data} = await this.axios.put(`/candidatos/${id}`, payload);
        if (data) return data;
        return false;
    }

    async deleteDev(id){
        const {data} = await this.axios.delete(`/candidatos/${id}`);
        if (data) return data;
        return false;
    }

    async getEmpMatch(id){
        const {data} = await this.axios.get(`/obterEmpresaSemMatch/${id}`);
        if (data) return data;
        return false;
    }
    
}