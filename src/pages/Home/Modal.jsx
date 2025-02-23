import React, { useState } from 'react'
import "./Modal.css"

function Modal({ closeModal, onSubmit, defaultValue, formType }) {

    const [formState, setFormState] = useState(defaultValue || {
        sana: "", ertalabkispid: "", ertalabkiqabulbakqoldiq: "", status: "live", kunyakunspid: "", quyilganyoqilgi: ""
    });

    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.sana && formState.ertalabkispid) {
            setErrors("");
            return true;
        } else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState)) {
                if (!value) {
                    errorFields.push(key);
                }
            }
            setErrors(errorFields.join(","));
            return false;
        }
    };

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormState({
            ...formState,
            [e.target.name]: file
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit(formState);
        closeModal();
    };

    const renderForm = () => {
        switch (formType) {
            case "form1":
                return (
                    <>
                        <div className='form-group'>
                            <label htmlFor="sana">Sana</label>
                            <input type="date" name="sana" onChange={handleChange} value={formState.sana} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="ertalabkispid">Ertalabki spidometr ko'rsatkishi</label>
                            <input type="number" name="ertalabkispid" onChange={handleChange} value={formState.ertalabkispid} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="ertalabkiqabulbakqoldiq">Ertalabki qabul qilishda bakdagi qoldiq</label>
                            <input type="number" name="ertalabkiqabulbakqoldiq" onChange={handleChange} value={formState.ertalabkiqabulbakqoldiq} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="status">Status</label>
                            <select name="status" onChange={handleChange} value={formState.status}>
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
                            <input type="number" name="kunyakunspid" onChange={handleChange} value={formState.kunyakunspid} />
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
                            <label htmlFor="quyilganyoqilgi">Quyilgan yoqilgi</label>
                            <input type="number" name="quyilganyoqilgi" onChange={handleChange} value={formState.quyilganyoqilgi} />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className='modal-container' onClick={(e) => { if (e.target.className === "modal-container") closeModal(); }}>
            <div className='modal'>
                {errors && <div className="error-messages">{errors}</div>}
                <form onSubmit={handleSubmit}>
                    {renderForm()}
                    <button type="submit" className='btn'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
 