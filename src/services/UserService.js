import axios from "axios"
import router from "../router";

class UserService {


    async ping() {
        await axios.get('/api/ping').then(response => {
            // console.log(response)
        });
    }

    async getUser() {
        const res = await axios.get('/api/user').then((response) => {
            console.log(response)
            return response.data
        }).catch((error) => {
            console.log(error)
        });
    }

    async login(email, password) {
        await axios.post('/api/login', {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response)
            // alert('You are Logged in!')
            localStorage.setItem("isUser", 'true');
            router.push('/account')
        }).catch((error) => {
            console.log(error)
            // return error
        });
    }

    async register(email, username, password) {
        await axios.post('/api/register', {
            email: email,
            username: username,
            password: password,
        }).then((response) => {
            console.log(response)
            // alert('You are Logged in!')
            localStorage.setItem("isUser", 'true');
            router.push('/account')
        }).catch((error) => {
            console.log(error)
            // return error
        });
    }


    async logout() {
        const res = await axios.post('/api/logout')
            .then((response) => {
                localStorage.removeItem("isUser");
                router.push("/");
                location.reload();
            }).catch((error) => {
                console.log(error)
            })
    }

    check() {
        // console.log(localStorage.getItem('isUser'))
        return localStorage.getItem('isUser');
    }

    guest() {
        return !this.check
    }

}

export default new UserService()