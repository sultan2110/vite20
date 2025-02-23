import React, { useState } from 'react'
import "./Modal.css"

function Modal1 ({closemodal1, onsubmit1, defaultvalue}) {

const [formstate, setformstate] = useState(defaultvalue||{
    kunyakunspid:""
})

const [errors, seterrors] = useState("")

const validateForm = ()=>{
    if(formstate.kunyakunspid){
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
    onsubmit1(formstate)
    closemodal1()
}


  return (
    <div className='modal-container' onClick={(e)=>{
        if(e.target.className === "modal-container") closemodal1()
    }}>
        <div className='modal'>
            <form action="" >
                <div className='form-group'>
                    <label htmlFor="kunyakunspid">Kun yakuni spidometr ko'rsatkishi</label>
                    <input type="number" name="kunyakunspid" onChange={handlechange} value={formstate.kunyakunspid} />
                </div>
                <div className='form-group'>
                    <label htmlFor="kunyakunspid">faylni yuklash</label>
                    <input type="file" name="kunyakunspid" onChange={handlechange} />
                </div>
                {errors && <div>{`ushbu maydonlarni toldiring:${errors}`}</div>}
                <button type="submit" className='btn' onClick={handlesubmit}>Submit</button>
            </form>
        </div>

    </div>
  )
}

export default Modal1