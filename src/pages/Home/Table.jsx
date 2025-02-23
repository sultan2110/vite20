import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./table.css";

function Table({ rows, deleterow, editrow }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Sana</th>
            <th>Ertalabki spidometr ko'rsatkichi</th>
            <th>Kun yakunidagi spidometr ko'rsatkishi</th>
            <th>Kun davomida bosib o'tgan yo'l (km)</th>
            <th>Kun davomida yoqilgi harajati (litr)</th>
            <th>Ertalabki qabul qilishdagi bakdagi qoldiq (litr)</th>
            <th>Kun yakuni bo'yicha bakdagi qoldiq (litr)</th>
            <th>Quyilgan yoqilgi (litr)</th>
            <th className="expand">Yo'nalish manzillari</th>
            <th>Status</th>
            <th>Tahrirlash</th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{row.id}</td>
                <td>{row.sana}</td>
                <td>{row.ertalabkispid}</td>
                <td>{row.kunyakunspid}</td>
                <td>{row.kundavomyol}</td>
                <td>{row.harajatyoqilgi}</td>
                <td>{row.ertalabkiqabulbakqoldiq}</td>
                <td>{row.kunyakunqoldiqbak}</td>
                <td>{row.quyilganyoqilgi}</td>
                <td>{row.yonalishmanzillar}</td>
                <td>
                  <span className={`label label-${row.status}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <span className="action">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleterow(idx)}
                    />
                    <BsFillPencilFill onClick={() => editrow(idx)} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
