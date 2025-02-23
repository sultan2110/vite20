import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Table from "./Table";
import Modal from "./Modal";
import { BsTaxiFront } from "react-icons/bs";
import "./Home.css";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const handleDelete = () => {};

  const handleRowEdit = () => {};

  console.log(modalOpen);
  return (
    <div className="home">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="addandavto">
          <div className="iconavto">
            <span>
              <BsTaxiFront />
            </span>
          </div>
          <div>
            <span onClick={() => setModalOpen(true)}>Ertalabki</span>
          </div>
          <div>
            <span onClick={() => setModalOpen(true)}>Kun yakuni</span>
          </div>
          <div>
            <span onClick={() => setModalOpen(true)}>Zapravka</span>
          </div>
        </div>

        <Table rows={rows} deleteRow={handleDelete} editRow={handleRowEdit} />

        {modalOpen && (
          <Modal
            closeModal={setModalOpen}
            rows={rows}
            setRows={setRows}
            // formType ma'lumotini yuboramiz
          />
        )}
      </div>
    </div>
  );
}

export default Home;
