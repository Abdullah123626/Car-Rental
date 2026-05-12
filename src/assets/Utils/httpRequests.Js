import axios, { AxiosError, AxiosHeaders } from "axios";


const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("Token");
    if (token) {
        const headers = new AxiosHeaders();
        headers.set("Authorization", `Bearer ${token}`);
        config.headers = headers;//config is an object, having the links, urls, and the other necessary things, in our code....
    }

    return config;

})


export const getRequest = async (url, params = {}, config = {}) => {

    try {
        let response = await api.get(url, { params, ...config });
        return response.data;

    } catch (error) {

    }

}

export const postRequest = async (url, data, params = {}, config = {}) => {
    try {
        let response = await api.post(url, data, { params, ...config });
        return response.data;
    } catch (error) {
        throw ErrorHandler(error);
    }
}

export const updateRequest = async (url, data, param = {}, config = {}) => {
    try {
        let response = await api.put(url, data, { param, ...config });
        return response.data;
    } catch (error) {

    }
}


const ErrorHandler = (error) => {
    let message = "Some Error has occured";
    let status = error.response?.status;

    if (error.response?.data) {
        let res = error.response?.data;
        message = res.error || res.metadata?.error || JSON.stringify(res);
    } else if (error.message) {
        message = error.message;
    }
    return { error: message, status };



}