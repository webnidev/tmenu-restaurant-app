import React from 'react'
import {MenuItem} from "rmwc";
import {GET_PRINTERS} from '../../Api'
const PrintList =({handleAction})=>{
    const [printers, setPrinters] = React.useState([])
    const getPrinters = async ()=>{
        try {
            const token = window.localStorage.getItem('token')
            const {url, options} = GET_PRINTERS(token, {total:0, perPage:0, page:1, lastpage:0})
            const response = await fetch(url, options)
            if(!response.ok) throw new Error(`Error: ${response.statusText}`)
            const {printers} = await response.json()
            console.log(printers)
            setPrinters(printers)
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(()=>{
        getPrinters()
    })

    return(
        <>
        {printers.map(printer=>{           
            return(
                <MenuItem onClick={handleAction} id={printer.id} key={printer.id}>{printer.name}</MenuItem>
            )
        })}    
        </>
    )

}
export default PrintList