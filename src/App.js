//packages
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//bootstrap cdn
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App min-vh-100">
      <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
