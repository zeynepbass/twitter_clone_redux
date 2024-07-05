const INITIAL_STATE={
    home:[]
}
const Home = (state:INITIAL_STATE,action) => {

   switch (action.type) {
    case 'Home':
         return {...state,home:action.payload}

   
    default:
      return state
   }

}

export default Home