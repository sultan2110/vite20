import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Table from './Table'
import Modal from './Modal'
import { BsTaxiFront } from "react-icons/bs";
import "./Home.css"

function Home() {
    const [modalOpen, setmodalOpen] = useState(false);
    const [formType, setFormType] = useState(null);
    const [rows, setRows] = useState([]);
    const [currentRow, setCurrentRow] = useState({});  // Yangi to'liq qatorni saqlash
    const [rowedit, setRowEdit] = useState(null);

    const handleRowEdit = (idx) => {
        setRowEdit(idx);
        setmodalOpen(true);
        setFormType("form1");
    };

    const handleDelete = (idx) => {
        setRows(rows.filter((_, i) => i !== idx));
    };

    const handleSubmit = (newRow) => {
        const updatedRow = { ...currentRow, ...newRow };

        // Agar barcha ma'lumotlar kiritilgan bo'lsa, yangi qatorni qo'shamiz
        if (updatedRow.sana && updatedRow.ertalabkispid && updatedRow.kunyakunspid && updatedRow.quyilganyoqilgi) {
            if (rowedit !== null) {
                // To'liq qatorni yangilash
                setRows(rows.map((row, idx) => (idx === rowedit ? updatedRow : row)));
            } else {
                // Yangi qatorni saqlash
                setRows([...rows, updatedRow]);
            }
            setmodalOpen(false);  // Modalni yopamiz
            setCurrentRow({});  // Yangi qatorni tozalaymiz
        } else {
            // Hali to'liq ma'lumotlar kiritilmagan bo'lsa, yangi rowni yangilash
            setCurrentRow(updatedRow);
        }
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
                    <div><span onClick={() => { setmodalOpen(true); setFormType("form1"); }}>Ertalabki</span></div>
                    <div><span onClick={() => { setmodalOpen(true); setFormType("form2"); }}>Kun yakuni</span></div>
                    <div><span onClick={() => { setmodalOpen(true); setFormType("form3"); }}>Zapravka</span></div>
                </div>

                <Table rows={rows} deleteRow={handleDelete} editRow={handleRowEdit} />

                {modalOpen && (
                    <Modal
                        closeModal={() => setmodalOpen(false)}
                        onSubmit={handleSubmit}
                        defaultValue={rowedit !== null ? rows[rowedit] : {}}
                        formType={formType} // formType ma'lumotini yuboramiz
                    />
                )}
            </div>
        </div>
    );
}

export default Home;
