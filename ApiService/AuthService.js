import api from './http';

export default class AuthService {
    static async login(data) {
        try {
            const response = await api.post('/users/login', {
                email: data.email,
                password: data.password,
            });
            return response ? response.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async registration(data) {
        return api.post('/users/registration', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            roles: data.roles,
        });
    }

    static async employeeReg(data) {
        return api.post('/employee/registration', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: 'password',
            roles: ['employee'],
            phone: data.phone,
            departmentId: data.departmentId,
            employerId: data.employerId,
            employeeId: data.employeeId,
            uei: data.uei,
            startDate: data.startDate,
            companyId: data.companyId,
            anualBudget: data.anualBudget
        });
    }

    static async courseReg(data) {
        return api.post('/course', {
            course_name: data.courseName,
            degree_type: data.degreeType,
            interest: data.interest,
            institution: data.institution,
            language: data.language,
            delivery: data.delivery,
            location: data.location,
            employerId: data.employerId,
            duration: data.duration,
            cost: data.cost,
            link: data.link,
            target: data.target,
            logo: data.logo,
            bgImage: data.bgImage,
            about: data.about,
            overview: data.overview,
            application_deadline: data.deadline,
            start_date: data.startDate,
            tuition_and_fees: data.tuitionFee
        });
    }

    static async activateUser({ code, userId }) {
        try {
            const response = await api.post(
                `/users/activate?code=${code}&id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async changePassword({ id, password, newPassword }) {
        try {
            const response = await api.post(`/users/change-password`, {
                id,
                password,
                newPassword,
            });
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async resendCode({ userId }) {
        try {
            const response = await api.post(
                `/users/resend-activate?id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async confirmAuthCode({ code, userId }) {
        try {
            const response = await api.post(
                `/users/confirm-auth?code=${code}&id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async resendConfirmAuthCode({ userId }) {
        try {
            const response = await api.post(
                `/users/resend-confirm-auth?id=${userId}`,
                {}
            );
            return response ? response?.data : null;
        } catch (e) {
            console.log('catch: ', e);
            return e;
        }
    }

    static async logout() {
        return api.post('/users/logout');
    }
}
