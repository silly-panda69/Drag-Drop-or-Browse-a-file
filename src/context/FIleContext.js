import React, { createContext, useReducer } from "react";

export const FileContext=createContext();

export const imgFilesReducer=(state,action)=>{
    switch(action.type){
        case 'SET_FILES':
            return {
                data: action.payload
            }
        case 'ADD_FILES':
            return {
                data: state.data.concat(action.payload)
            }
        case 'REMOVE_FILES':
            let items=[];
            for (let i=0;i<state.data.length;i++){
                if(i!==action.payload){
                    items.push(state.data[i]);
                }
            }
            return {
                data: items
            }
        default:
            return state;
    }
}

export const FileContextProvider = (props) => {
    const [imgFiles,dispatch]=useReducer(imgFilesReducer,{
        data: null
    });
    return (
        <FileContext.Provider value={{...imgFiles,dispatch}}>
            {props.children}
        </FileContext.Provider>
    );
}
 