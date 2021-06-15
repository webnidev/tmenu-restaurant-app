import React, { useEffect } from "react";
import { Navigate } from 'react-router-dom'

function Logout(){
    useEffect(()=>{
        window.localStorage.removeItem('token')
    })
    return <Navigate to="/login"/>
}

export default Logout