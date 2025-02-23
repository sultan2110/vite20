import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Table from "./Table";
import Modal from "./Modal";
import { BsTaxiFront } from "react-icons/bs";
import "./Home.css";

function Home() {
  const [modalOpen, setModalOpen] = useState({
    value: false,
    type: "",
  });
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
            <span
              onClick={() => setModalOpen({ value: true, type: "ertalabki" })}
            >
              Ertalabki
            </span>
          </div>
        </div>

        <Table
          rows={rows}
          deleteRow={handleDelete}
          editRow={handleRowEdit}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />

        {modalOpen.value && (
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
