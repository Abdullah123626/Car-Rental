import axios from "axios";




export default function imageUpload(formData) {

    let apiConfig = '';
    const baseUrl = 'http://localhost:5000/api';
    const endPoint = `/upload/anyfile`;
    const url = baseUrl + endPoint;

    return new Promise((resolve, reject) => {
        try {
            apiConfig = axios.post(url, formData);
            apiConfig.then((response) => {
                resolve(response.data.data);
            })

        } catch (error) {
            reject(error.message);
        }
    })
}