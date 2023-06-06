import React,{useState,useRef, useContext, useEffect} from "react";
import { FileContext } from "../context/FIleContext";

const TakePhoto = () => {
    const {dispatch}=useContext(FileContext);
    const [camData, setCamData] = useState();
    const [camStream,setCamStream]=useState();
    const videoBox = useRef(null);
    const canvasRef = useRef(null);
    const modalRef=useRef(null);
    useEffect(()=>{
        modalRef.current.addEventListener('hidden.bs.modal',modalClose);
    });
    const modalClose=()=>{
        setCamData();
        if(camStream){
            camStream.getTracks().forEach(track=>track.stop());
        }
        setCamStream();
    }
    const startCamera = async() => {
        setCamData();
        setCamStream();
        let streamData=await navigator.mediaDevices.getUserMedia({ video: true });
        videoBox.current.srcObject = streamData;
        setCamStream(streamData);
    }
    const takePicture = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoBox.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const data = canvasRef.current.toDataURL('image/png');
        setCamData(data);
        if(camStream){
            camStream.getTracks().forEach(track=>track.stop());
        }
    }
    const retakePicture=()=>{
        startCamera();
    }
    const DoneTakingPic=()=>{
        // dispatch({type: 'ADD_FILES',payload: camData});
        if(camStream){
            camStream.getTracks().forEach(track=>track.stop());
        }
    }
    const CancelTakingPic=()=>{
        if(camStream){
            camStream.getTracks().forEach(track=>track.stop());
        }
    }
    return (
        <div>
            <button
                    className="btn btn-outline"
                    type="button"
                    class="btn btn-primary"
                    onClick={startCamera}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Take A Photo
                </button>
                <div class="modal fade" ref={modalRef} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" >
                    <div class="modal-content p-3 bg-light" >
                        {!camData && (
                            <video height={"300px"} width={'100%'} className=" bg-dark rounded rounded-2" ref={videoBox} autoPlay></video>
                        )}
                        {camData && (
                            <img height={"300px"}  className="rounded rounded-2" src={camData} alt="captured" />
                        )}
                        {!camData && (
                            <div className="pt-2">
                                <button className="btn btn-sm btn-success" onClick={takePicture}>Take a snap</button>
                                <span className="mx-2"></span>
                                <button className="btn btn-sm btn-danger" onClick={CancelTakingPic} data-bs-dismiss="modal">Cancel</button>
                            </div>
                        )}
                        {camData && (
                            <div className="pt-2">
                                <button className="btn btn-sm btn-danger" onClick={retakePicture}>Retake</button>
                                <span className="mx-2"></span>
                                <button className="btn btn-sm btn-success" onClick={DoneTakingPic} data-bs-dismiss="modal">Done</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
}
 
export default TakePhoto;