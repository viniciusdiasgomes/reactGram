export const api = "http://localhost:5000/api"
export const uploads = "http://localhost:5000/uploads"

export const requestConfig = (method, data, token = null,  Image = null ) => {

    let config

    if(Image){
        config = {
            method,
            body: data,
            Headers:{},
        }
}else if(method === "DELETE" || data === null){

config = {
    method,
    Headers:{},
}

}else{
    config = {
        method,
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    }
}

if(token) {
    config.headers.Authorization = `Bearer ${token}`
}

return config;
}