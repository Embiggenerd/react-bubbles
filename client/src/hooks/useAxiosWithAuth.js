import axios from 'axios'

export const useAxiosWithAuth = () => {
    const token = localStorage.getItem('token');
    console.log('token', token)
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });
}