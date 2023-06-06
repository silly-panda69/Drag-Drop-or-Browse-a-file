import React,{useState,useRef, useContext} from "react";
import { FileContext } from "../context/FIleContext";
import Toast from "./Toast";
import * as bootstrap from 'bootstrap';

const Browse = () => {
    const {dispatch}=useContext(FileContext);
    const [fileList, setFileList] = useState();
    const [isDragging, setIsDragging] = useState(false);
    const closeModalBtn = useRef(null);
    const fileInputBtn = useRef(null);
    const modalRef=useRef(null);
    const toastRef=useRef(null);
    const openToast=()=>{
        const toastBs=bootstrap.Toast.getOrCreateInstance(toastRef.current);
        toastBs.show();
    }
    const handleModalClose = () => {
        closeModalBtn.current.click();
    }
    const handleSelectFiles = () => {
        fileInputBtn.current.click();
    };
    const handleFileChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
        e.target.value=null;
    };
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        handleFiles(files);
    };
    const handleFiles = (files) => {
        var tempFile = new DataTransfer();
        var filearray=[];
        let count=0;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const ftype = file.type.split("/").pop();
            if (ftype === "png" || ftype === "jpg" || ftype === "jpeg") {
                tempFile.items.add(file);
                filearray.push(file);
            }else{
                if(count===0){
                    openToast();
                    count=1;
                }
            }
        }
        count=0;
        if (fileList !== undefined) {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const ftype = file.type.split("/").pop();
                if (ftype === "png" || ftype === "jpg" || ftype === "jpeg") {
                    tempFile.items.add(file);
                    filearray.push(file);
                }
            }
        }
        setFileList(tempFile.files);
        console.log(filearray);
        dispatch({type: 'SET_FILES',payload: filearray});
        handleModalClose();
    };
    return (
        <div>
            <Toast toastRef={toastRef}></Toast>
            <button
                    className="btn btn-outline"
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Browse/Upload
                </button>
                <div
                class="modal fade"
                id="staticBackdrop"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                ref={modalRef}
            >
                <div class="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div class="container bg-white p-3 rounded rounded-2">
                            <div className="d-flex justify-content-between align-items-center pb-2">
                                <h5 className="pb-1 m-0">Upload your file</h5>
                                <button ref={closeModalBtn} className="btn btn-light btn-sm rounded-circle" data-bs-dismiss="modal">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </button>
                            </div>
                            <div
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                class="container bg-light rounded rounded-2 d-flex flex-column align-items-center p-4"
                                style={{ border: "2px dashed", borderColor: "#adb5bd" }}
                            >
                                <div className="d-flex flex-column align-items-center p-3">
                                    <p>Drag your images here</p>
                                    <p>supports jpeg,png etc.</p>
                                    <p>OR</p>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={handleSelectFiles}
                                    >
                                        Browse Files
                                    </button>
                                    <input
                                        ref={fileInputBtn}
                                        onChange={handleFileChange}
                                        className="d-none"
                                        type="file"
                                        id="fileInput"
                                        multiple
                                        accept="image/*"
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Browse;