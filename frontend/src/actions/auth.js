import axios from "axios"


 export const FetchAuthData=(post)=>{
    return (dispatch)=>{
        axios.post("http://localhost:9372/user/uye-ol",post)
        .then((response)=>{
            dispatch({type:"auth",payload:response.data})
        })
        .catch((error)=>{
            console.error('Error fetching data:', error);
   
        })
    }
}

