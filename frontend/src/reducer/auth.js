const INITIAL_STATE={
    auth:{}
}

const Login = (state=INITIAL_STATE,action) => {
 switch (action.type) {
    case "auth":
        return {...state,auth:action.payload}
        
 
        default:
            return state;
 }
}

export default Login