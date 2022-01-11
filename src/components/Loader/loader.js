import React from 'react'
import spinner from "../../assets/Spinner-1s-200px (1).gif";
import './style.css'

const Loader = (props) => {
    return (
        <div className="image-loader" style={{display:props?.bool === false ? "none" : "block"}}>
            <img src={spinner}/>   
        </div>
    )
}

export default Loader
