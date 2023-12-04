import api from "../utils/api";


export default class CompanyService {
    constructor(){
        this.axios = api;
    }

    async createCompany(payload){
        const {data} = await this.axios.post('/empresas', payload);
        if (data) return data;
        return false;
    }

    async getAllCompanies(){
        const {data} = await this.axios.get('/empresas');
        if (data) return data;
        return false;
    }

    async getCompanyById(id){
        const {data} = await this.axios.get(`/empresas/${id}`);
        if (data) return data;
        return false;
    }

    async getCompanyById(id){
        const {data} = await this.axios.get(`/empresas/${id}`);
        if (data) return data;
        return false;
    }

    async updateCompany(id, payload){
        const {data} = await this.axios.put(`/empresas/${id}`, payload);
        if (data) return data;
        return false;
    }

    async deleteCompany(id){
        const {data} = await this.axios.delete(`/empresas/${id}`);
        if (data) return data;
        return false;
    }

    async getDevsMatch(id){
        const {data} = await this.axios.get(`/obterCandidatoSemMatch/${id}`);
        if (data) return data;
        return false;
    }
    
}