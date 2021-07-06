import React from 'react';
import { GET_COMPANY } from './Api';
import { useNavigate } from 'react-router-dom';

export const CompanyContext = React.createContext();

export const CompanyStorage = ({children})=>{
    const [data, setData] = React.useState(null);
    const navigate = useNavigate();
    async function getData(){
        try {
            const token = window.localStorage.getItem('token')
            if(!token) throw new Error('Token inválido!')
            const {url, options} = GET_COMPANY(token)
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(`Error: ${response.statusText}`)
            const {companys} = await response.json()
            return companys
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <CompanyContext.Provider
          value={{ getData, data, setData }}
        >
          {children}
        </CompanyContext.Provider>
      )
}