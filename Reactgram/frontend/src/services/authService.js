import{api, requestConfig} from '../utils/config'

//Register an user
const Register = async(data) => {
    const config = requestConfig("POST", data)
    try {
        
    const res = await fetch(api + "/users/register", config)
    .then((res) => res.json())
    .catch((err)=> err);

        if(res) {
            localStorage.setItem("user", JSON.stringify)
        }
return res;

    } catch (error) {
        console.log(error)
    }
}

//Logout an user
const logout = () => {
    localStorage.removeItem("user")
}

const authService = {
    Register,
    logout,
}

export default authService;