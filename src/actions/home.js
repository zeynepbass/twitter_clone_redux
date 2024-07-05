import axios from "axios"
const Home=(dispatch)=>{
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((response)=>{
        dispatch({type:"Home",payload:response.data});
    })
}
export default Home