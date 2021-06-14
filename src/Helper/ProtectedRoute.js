import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const ProtectedRoute = (props)=>{
if(window.localStorage.getItem('token')){
    return <Route {...props} />
}
return <Navigate to="/login"/>
}

export default ProtectedRoute