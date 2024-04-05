import api from './http';

export default class UserService {
    static async getUsers(email, password) {
        return api.get('/users');
    }

    static async getUser() {
        return api.get('/users/current-user');
    }
}
