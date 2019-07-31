const initialState ={
    loggedIn:false
}

export default function reducer(state=initialState,action) {
    switch(action.type){
        case "USER_LOGIN": {
            return {...state, loggedIn: true}
        }
        case "USER_LOGOUT":{
            return {...state, loggedIn: false}
        }
    }
    
    return state
}