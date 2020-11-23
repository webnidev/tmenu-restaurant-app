import React from "react";
import MainNav from "./MainNav";
import Home from "./Components/Home";


const App = () => {
  return (
    <>    
            
      <div className={"MainContainer"}>
        <MainNav />
        <Home/>          
      </div>
      
    </>
  );
};

export default App;
