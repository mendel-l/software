import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import InventarioOffcanvas from '../../../constant/InventarioCreate'; // Asumí que tienes un componente para agregar inventario

const URI = 'http://localhost:3001/api/inventario';

const InventarioShow = () => {
  const [inventarios, setInventarios] = useState([]);

  useEffect(() => {
    getInventarios();
  }, []);

  // Procedimiento para mostrar todos los inventarios
  const getInventarios = async () => {
    const res = await axios.get(URI);
    setInventarios(res.data);
  };

  // Procedimiento para eliminar un inventario
  const deleteInventario = async (idInventario) => {
    await axios.delete(`${URI}/${idInventario}`);
    getInventarios();
  };

  const headers = [
    { label: "idInventario", key: "idInventario" },
    { label: "Nombre", key: "Nombre" },
    { label: "Descripcion", key: "Descripcion" },
    { label: "Cantidad", key: "Cantidad" },
    { label: "Precio", key: "Precio" },
    { label: "Estado", key: "Estado" },
    { label: "createAt", key: "createAt" },
  ];

  const csvlink = {
    headers: headers,
    data: inventarios,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = inventarios.slice(firstIndex, lastIndex);
  const npage = Math.ceil(inventarios.length / recordsPage);
  const number = [...Array(npage + 1).keys()].slice(1);

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const inventario = useRef();

  return (
    <>
      <div>
        <h4 className="heading mb-0">Inventario</h4>
        <div>
          <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
            <i className="fa-solid fa-file-excel" /> Exportar reporte
          </CSVLink>
          <Link
            to={"#"}
            className="btn btn-primary btn-sm ms-1"
            data-bs-toggle="offcanvas"
            onClick={() => inventario.current.showInventarioModal()}
          >
            + Agregar Artículo de Inventario
          </Link>
        </div>
      </div>
      <table className="table ItemsCheckboxSec dataTable no-footer mb-0">
        <thead>
          <tr>
            <th>idInventario</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>createAt</th>
          </tr>
        </thead>
        <tbody>
          {records.map((inventario) => (
            <tr key={inventario.idInventario}>
              <td>{inventario.idInventario}</td>
              <td>{inventario.Nombre}</td>
              <td>{inventario.Descripcion}</td>
              <td>{inventario.Cantidad}</td>
              <td>{inventario.Precio}</td>
              <td>{inventario.Estado}</td>
              <td>{inventario.createAt}</td>
              <td>
                <Link
                  to={`/edit-inventario/${inventario.idInventario}`}
                  className="btn btn-info"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteInventario(inventario.idInventario)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <InventarioOffcanvas ref={inventario} Title="Agregar Artículo de Inventario" />
    </>
  );
};

export default InventarioShow;

