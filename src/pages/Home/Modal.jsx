import React, { useState } from "react";
import "./Modal.css";

function Modal({ closeModal, rows, setRows }) {
  const [formState, setFormState] = useState({
    sana: "",
    ertalabkispid: "",
    ertalabkiqabulbakqoldiq: "",
    status: "live",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setRows([...rows, formState]);
    closeModal(false);
    console.log(formState);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="sana"
            value={formState.sana}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            name="ertalabkispid"
            value={formState.ertalabkispid}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            name="ertalabkiqabulbakqoldiq"
            value={formState.ertalabkiqabulbakqoldiq}
            onChange={(e) => handleChange(e)}
          />
          <select
            name="status"
            id=""
            value={formState.status}
            onChange={(e) => handleChange(e)}
          >
            <option value="live">Saylan</option>
            <option value="live">live</option>
            <option value="error">error</option>
            <option value="draft">draft</option>
          </select>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
