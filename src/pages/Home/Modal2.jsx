import React, { useState } from 'react'
import "./Modal.css"

function Modal2 ({closemodal, onsubmit, defaultvalue}) {

const [formstate, setformstate] = useState(defaultvalue||{
    quyilganyoqilgi:""
})

const [errors, seterrors] = useState("")

const validateForm = ()=>{
    if(formstate.quyilganyoqilgi){
        seterrors("")
        return true
    } else {
        let errorFields = []
        for(const[key, value] of Object.entries(formstate)){
            if(!value){
                errorFields.push(key)
            }
        }
        seterrors(errorFields.join(","))
        return false
    }
}

const handlechange = (e)=>{
    setformstate({
        ...formstate,
        [e.target.name]: e.target.value,
    })
}

const handlesubmit = (e)=>{
    e.preventDefault()
    if(!validateForm()) return
    onsubmit(formstate)
    closemodal()
}


  return (
    <div className='modal-container' onClick={(e)=>{
        if(e.target.className === "modal-container") closemodal()
    }}>
        <div className='modal'>
            <form action="" >
                <div className='form-group'>
                    <label htmlFor="quyilganyoqilgi">quyilgan yoqilgi</label>
                    <input type="number" name="quyilganyoqilgi" onChange={handlechange} value={formstate.quyilganyoqilgi} />
                </div>
                
                {errors && <div>{`ushbu maydonlarni toldiring:${errors}`}</div>}
                <button type="submit" className='btn' onClick={handlesubmit}>Submit</button>
            </form>
        </div>

    </div>
  )
}

export default Modal2