import api from "../utils/api";


export default class VagaService {
    constructor(){
        this.axios = api;
    }

    async createVacancie(payload){
        const {data} = await this.axios.post('/vagas', payload);
        if (data) return data;
        return false;
    }

    async getAllVacancies(){
        const {data} = await this.axios.get('/vagas');
        if (data) return data;
        return false;
    }

    async getVacanciesById(id){
        const {data} = await this.axios.get(`/vagas/${id}`);
        if (data) return data;
        return false;
    }

    async updateVacancie(id, payload){
        const {data} = await this.axios.patch(`/vagas/${id}`, payload);
        if (data) return data;
        return false;
    }

    async deleteVacancie(id){
        const {data} = await this.axios.delete(`/vagas/${id}`);
        if (data) return data;
        return false;
    }
    
}