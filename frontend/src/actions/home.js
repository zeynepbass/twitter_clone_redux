import axios from 'axios';

export const fetchHomeData = () => {
  return (dispatch) => {
    axios.get('http://localhost:9372/post/panel')
      .then((response) => {
        dispatch({ type: 'Home', payload: response.data.reverse() });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
};
export const Detay = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:9372/post/detay/${id}`)
      .then((response) => {
        dispatch({ type: 'Detay', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
};
export const CommentPost = (id,yorum) => {
  return (dispatch) => {
    axios.post(`http://localhost:9372/post/detay/${id}`,{yorum})
      .then((response) => {
        dispatch({ type: 'Post', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
};
