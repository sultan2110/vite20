import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Table from './Table'
import Modal from './Modal'
import { BsTaxiFront } from "react-icons/bs";
import "./Home.css"


function Home() {
    const [modalOpen, setmodalOpen] = useState(false);
    const [formType, setFormType] = useState(null); // yangi holat form turini belgilash uchun
 
    const [rows, setrows] = useState([
        {id:"1", sana:"20.02.2025", ertalabkispid:"72812", kunyakunspid:"72938", kundavomyol:"126", harajatyoqilgi:"20.034",
        ertalabkiqabulbakqoldiq:"15.044", kunyakunqoldiqbak:"35.01", quyilganyoqilgi:"40", yonalishmanzillar:"25-sonli maktab", status:"live"
    }
    // ma'lumotlar
    ]);
 
    const [rowedit, setrowedit] = useState(null);
 
    const handlerowedit = (idx) => {
      setrowedit(idx);
      setmodalOpen(true);
      setFormType("form1"); // Hozirgi turdagi formani belgilash
    };

    const handledelete = (a)=>{
        setrows(rows.filter((_, idx)=>idx !==a))
    }
 
    /*const handlesubmit = (newrow) => {
      rowedit === null
        ? setrows([...rows, newrow])
        : setrows(
            rows.map((currew, idx) => {
              if (idx !== rowedit) return currew;
              return newrow;
            })
        );
    };*/

    const handlesubmit = (newrow) => {
        setrows([...rows, newrow]);
      };
 
    return (
      <div className='home'>
        <Sidebar />
        <div className='main'>
          <Navbar />
          <div className='addandavto'>
            <div className='iconavto'>
              <span><BsTaxiFront /></span>
            </div>
            <div><span onClick={() => { console.log('Ertalabki bosildi'); setmodalOpen(true); setFormType("form1"); }}>Ertalabki</span></div>
            <div><span onClick={() => { setmodalOpen(true); setFormType("form2"); }}>Kun yakuni</span></div>
            <div><span onClick={() => { setmodalOpen(true); setFormType("form3"); }}>Zapravka</span></div>
          </div>
 
          <Table rows={rows} deleterow={handledelete} editrow={handlerowedit} />
 
          {modalOpen && (
            <Modal
              closemodal={() => setmodalOpen(false)}
              onSubmit={handlesubmit}
              defaultvalue={rowedit !== null && rows[rowedit]}
              formType={formType} // turini yuborish
            />
          )}
        </div>
      </div>
    );
  }

  export default Home


  import React, { useState } from 'react'
import "./Modal.css"

function Modal({closemodal, onSubmit, defaultvalue, formType}) {

const [formstate, setformstate] = useState(defaultvalue||{
    sana:"", ertalabkispid:"", ertalabkiqabulbakqoldiq:"", status:"live"
})

const [errors, seterrors] = useState("")

const validateForm = ()=>{
    if(formstate.sana && formstate.ertalabkispid && formstate.ertalabkiqabulbakqoldiq && formstate.status){
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

const handlechange = (e) => {
    const { name, value } = e.target;
    setformstate({
      ...formstate,
      [name]: value,
    });
  };

const handleFileChange = (e) => {
    const file = e.target.files[0];
    setformstate({
      ...formstate,
      [e.target.name]: file
    });
  };

const handlesubmit = (e)=>{
    e.preventDefault()
    /*if(!validateForm()) return*/
    onSubmit(formstate)
    closemodal()
}

    const renderForm = () => {
        switch (formType) {
            case "form1":
  return (
    <>
                    <div className='form-group'>
                    <label htmlFor="sana">Sana</label>
                    <input type="date" name="sana" onChange={handlechange} value={formstate.sana} />
                </div>
                <div className='form-group'>
                    <label htmlFor="ertalabkispid">Ertalabki spidometr ko'rsatkishi</label>
                    <input type="number" name="ertalabkispid" onChange={handlechange} value={formstate.ertalabkispid}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="fayl">Faylni yuklash</label>
                    <input type="file" name="ertalabkispid"/>
                </div>
                <div className='form-group'>
                    <label htmlFor="ertalabkiqabulbakqoldiq">Ertalabki qabul qilishda bakdagi qoldiq</label>
                    <input type="number" name="ertalabkiqabulbakqoldiq" onChange={handlechange} value={formstate.ertalabkiqabulbakqoldiq} />
                </div>
                <div className='form-group'>
                    <label htmlFor="status">Status</label>
                    <select name="status" onChange={handlechange} value={formstate.status} >
                        <option value="live">live</option>
                        <option value="error">error</option>
                        <option value="draft">draft</option>
                    </select>
                </div>
                </>
                );
                
                case "form2":
                return (
                    <>
                    <div className='form-group'>
                    <label htmlFor="kunyakunspid">Kun yakuni spidometr ko'rsatkishi</label>
                    <input type="number" name="kunyakunspid" onChange={handlechange} value={formstate.kunyakunspid} />
                </div>
                <div className='form-group'>
                <label htmlFor="kunyakunspid">Faylni yuklash</label>
                <input type="file" name="kunyakunspid" onChange={handleFileChange} />
                </div>
                    </>
                );

                case "form3":
                return (
                    <>
                    <div className='form-group'>
                    <label htmlFor="quyilganyoqilgi">quyilgan yoqilgi</label>
                    <input type="number" name="quyilganyoqilgi" onChange={handlechange} value={formstate.quyilganyoqilgi} />
                </div>
                </>
                );

                default:
                return null;
                }
                };

                return (
                    <div className='modal-container' onClick={(e) => { if (e.target.className === "modal-container") closemodal(); }}>
                      <div className='modal'>
                      {errors && <div className="error-messages">{errors}</div>}
                        <form onSubmit={handlesubmit}>
                          {renderForm()}
                          <button type="submit" className='btn'>Submit</button>
                        </form>
                      </div>
                    </div>
                  );
                }

                                
           

export default Modal