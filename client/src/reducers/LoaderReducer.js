const LoderReducer = (state, { type, payload}) => {
  
    switch (type) {
        case 'LODER_START': 

              return 100;
              
            case 'LODER_END':
                return 0;
           
    
        default:
            return state;
           
    }

}

//! export default
export default LoderReducer;