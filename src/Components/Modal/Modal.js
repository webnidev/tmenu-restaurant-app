import React from 'react'
import './Modal.css'

const Modal =({open, setOpen, Content})=>{
    
return(
    <> {open &&
        <div className="modal">
            <div className="modalContent">
            <span className="close" onClick={()=>{setOpen(false)}}>&times;</span>
                <Content/>
            </div>
        </div>}
    </>
)
}

export default Modal