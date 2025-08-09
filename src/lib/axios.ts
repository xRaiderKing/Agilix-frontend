import axios from "axios";

const api = axios.create({
    baseURL: "https://agilix-backend-dadndkenepd8azff.canadacentral-01.azurewebsites.net/api"
})


// Interceptar antes de cada petición el Token del LocalStorange
api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api;