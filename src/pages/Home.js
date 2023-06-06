import React, { useContext} from 'react';
import FileList from "../components/FileList";
import TakePhoto from "../components/TakePhoto";
import Browse from "../components/Browse";
import { FileContext } from "../context/FIleContext";

const Home = () => {
    const {data}=useContext(FileContext);
    return (
        <div className="font-monospace">
            <div className="d-flex mt-4 justify-content-center">
                <Browse></Browse>
                <span className="mx-3"></span>
                <TakePhoto></TakePhoto>
            </div>
            <FileList></FileList>
        </div>
    );
};

export default Home;
