import axios from "axios"


 export const FetchAuthData=(post)=>{
    return (dispatch) => {
        axios.post("http://localhost:9380/user/uye-ol", post)
            .then((response) => {
                dispatch({ type: "AUTH_REGISTER_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
        
            });
    };
}
export const FetchLogin = (post) => {
    return async (dispatch) => {
      try {
        const response = await axios.post("http://localhost:9380/user/signin", post);
        console.log('Response from API:', response.data); // Yanıtı kontrol etmek için ekleyin
        dispatch({ type: "authLogin", payload: response.data });
        return response.data; // Yanıtı döndür
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Hata durumunda hata fırlat
      }
    };
  };


