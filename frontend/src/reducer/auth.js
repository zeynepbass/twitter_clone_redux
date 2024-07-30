const INITIAL_STATE={
    auth:null
}

const Login = (state=INITIAL_STATE,action) => {
 switch (action.type) {
    case "auth":
        return {...state,auth:action.payload}
        
 case "authLogin":
    return {...state,auth:action.payload, error: null}

        default:
            return state;
 }
}

export default Login