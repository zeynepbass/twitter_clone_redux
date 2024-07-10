const INITIAL_STATE = {
   yaziListesi: [],
   yaziDetay:{},
   post:null
 };
 
 const Index = (state = INITIAL_STATE, action) => {
   switch (action.type) {
     case 'Home':
       return { ...state, yaziListesi: action.payload };
       case 'Detay':
        return { ...state, yaziDetay: action.payload };
        case 'Post':
          return { ...state, post: action.payload };
     default:
       return state;
   }
 };
 
 export default Index;
 