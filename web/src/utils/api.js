import axios from "axios";

const base = process.env.VUE_APP_API_BASE || 'http://localhost:3001/api';

export default {
    init (token) {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
        }
    },
    async register (username, password) {
        const response = await axios.post(`${base}/register`, { username, password });

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        return response.data.token;
    },
    async login (username, password) {
        const response = await axios.post(`${base}/login`, { username, password });

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        return response.data.token;
    },
    async logout () {
        axios.defaults.headers.common['Authorization'] = null;
    },
    async purchase () {
        const response = await axios.post(`${base}/purchase`, {});

        return response.data.status;
    },
    inventory: {
        async list () {
            const response = await axios.get(`${base}/inventory`);

            return response.data;
        },
        async search (q) {
            const response = await axios.get(`${base}/inventory`, { params: { q } });

            return response.data;
        }
    },
    bag: {
        async list () {
            const response = await axios.get(`${base}/bag`);

            return response.data;
        },
        async add (id) {
            const response = await axios.post(`${base}/bag`, { id });

            return response.data;
        },
        async delete (id) {
            const response = await axios.delete(`${base}/bag/${id}`);

            return response.data;
        }
    },
    possessions: {
        async get () {
            const response = await axios.get(`${base}/possessions`);

            return response.data;
        }
    }
}

