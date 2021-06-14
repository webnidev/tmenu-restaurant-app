import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const RedirectToHome = (props)=>{
if(window.localStorage.getItem('token')){
    return <Navigate to="/"/>
}
return <Route {...props} />
}

export default RedirectToHome