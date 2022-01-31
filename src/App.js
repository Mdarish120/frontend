import './App.css';
import NavBar from "./component/NavBar";
import Home from './component/Home';
import Auth from "./component/Auth";
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import React,{useState} from "react";




function App() {

  const [userName,setUserName]=useState();

 

  const getName=(name)=>{

      setUserName(name.toString());
  }
 

  return (
    <div >
   
    <Router>
    <NavBar/>
      <Routes>
        
        <Route  exact path="/" element={<Home name={userName} />}/>
        <Route  exact path="/auth" element={<Auth getName={getName}/>} />
          
      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
