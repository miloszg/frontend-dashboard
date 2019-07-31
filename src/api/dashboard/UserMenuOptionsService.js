import axios from "axios";

class UserMenuOptionsService{
    retrieveAllUserMenuOptions(name){
        return axios.get(`http://localhost:9000/jpa/users/${name}/menu-options`)
    }

    retrieveUserMenuOption(name, id){
        return axios.get(`http://localhost:9000/jpa/users/${name}/menu-option/${id}`)
    }

}

export default new UserMenuOptionsService()