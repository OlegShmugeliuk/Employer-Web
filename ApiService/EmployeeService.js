import api from './http';

export default class EmployeeService {
    static async createDepartment(data) {
        return await api.post('/department', {
            name: data.name,
        });
    }

    static async getDepartments() {
        const { data } = await api.get('/department');
        return data;
    }

    static async getEmployees() {
        const { data } = await api.get('/employee/get-employee');
        return data;
    }

    static async getTransactionByEmployer(id) {
        const { data } = await api.get(`/transactions/by-employer/${id}`);
        return data;
    }

    static async deleteEmployee(id) {
        const { data } = await api.delete(`/employee/${id}`);
        return data;
    }

    static async createBonusPlan(plan) {
        return await api.post('/bonuses', plan);
    }

    static async updateBonusPlan(plan) {
        return await api.put('/bonuses', plan);
    }

    static async forgiveEmployee(id) {
        return await api.put(`/bonuses/forgive/${id}`);
    }

    static async getBonusPlanById(params) {
        const { data } = await api.get(`/bonuses/${params.queryKey[1]}`);
        return data;
    }

    static async getBonusesByEmployerId(params) {
        const { data } = await api.get(
            `/bonuses/employer/${params.queryKey[1]}`
        );
        return data;
    }
}
