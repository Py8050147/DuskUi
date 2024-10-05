import axios from "axios";


// const api = axios.create({
//     baseURL: '/api',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     withCredentials: true 
// })


export const login = async (data) => 
    await axios.post('/api/v2/users/login', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true

    })



export const register = async (data) => 
    await axios.post('/api/v2/users/register', data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    })

    export const getcurrentUser = async () => 
        await axios.get('/api/v2/users/getCurrentUser', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })

        export const changePassword = async (passwordData) => 
            await axios.post('/api/v2/users/change-password', passwordData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            export const updateAccount = async (data) => 
                await axios.post('/api/v2/users/updateAccount', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                })
