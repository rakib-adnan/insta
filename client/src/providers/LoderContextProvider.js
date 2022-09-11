import { useReducer } from "react";
import LoderContext from "../context/LoaderContext";
import LoderReducer from "../reducers/LoaderReducer";


    //! create state
    export const initial =0;

const LoderContextProvider = ({ children }) => { 

    const [LoderState, LoderDispatch] = useReducer(LoderReducer, initial );
    return (
        <LoderContext.Provider
        value={{
            LoderState,
            LoderDispatch
     
        }}
        >
            {children}
        </LoderContext.Provider>
    )
}


//! exports
export default LoderContextProvider;