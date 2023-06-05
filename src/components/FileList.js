import React, { useContext } from 'react';
import { FileContext } from '../context/FIleContext';

const FileList = () => {
    const {data,dispatch}=useContext(FileContext);
    const handleRemove=(index)=>{
        dispatch({type: 'REMOVE_FILES',payload: index});
        console.log(index);
    }
    return (
        <div className="mt-3">
                {data &&
                    data.map((item, index) => {
                        return (
                            <div className="container bg-light shadow-sm p-3 mb-3 rounded d-flex align-items-center justify-content-between">
                                <div className="d-flex text-truncate align-items-start justify-content-start">
                                    <img height={"30px"} width={"50px"} src={URL.createObjectURL(item)} />
                                    <span className="ms-3"></span>
                                    <p className="p-0 m-0 text-truncate">{item.name}</p>
                                </div>
                                <button className="btn ms-3 btn-light btn-sm rounded-circle" onClick={() => handleRemove(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
            </div>
    );
}
 
export default FileList;