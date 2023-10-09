import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../../layouts/MainPagetitle';
import InventarioCreate from '../../../constant/InventarioCreate'; // Cambiado
import axios from 'axios';

const URI = 'http://localhost:3001/api/inventario'; // Cambiado

const CompInventarioShow = () => {
  const [inventario, setInventario] = useState([]); // Cambiado
  useEffect(() => {
    getInventario(); // Cambiado
  }, []);

  // Esto es para recargar la página al momento de crear un elemento de inventario
  const reloadInventario = () => {
    // Esta función se pasará a InventarioCreate
    // y se llamará para actualizar el estado local
    getInventario(); // Cambiado
  };

  // Procedimiento para mostrar todos los elementos de inventario
  const getInventario = async () => {
    const res = await axios.get(URI);
    setInventario(res.data);
  };

  // Procedimiento para eliminar un elemento de inventario
  const deleteInventario = async (IdInventario) => {
    await axios.delete(`${URI}/${IdInventario}`);
    getInventario(); // Cambiado
  };

  const headers = [
    { label: "IdInventario", key: "IdInventario" },
    { label: "Cantidad Disponible", key: "CantidadDisponible" },
    { label: "Precio de Venta", key: "PrecioVenta" },
    { label: "ID Medicamento", key: "idMedicamento" },
    { label: "Estado", key: "Estado" },
  ];

  const csvlink = {
    headers: headers,
    data: inventario,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = inventario.slice(firstIndex, lastIndex); // Cambiado
  const npage = Math.ceil(inventario.length / recordsPage);
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

  const elemento = useRef(); // Cambiado

  return (
    <>
      <MainPagetitle mainTitle="Inventario" pageTitle={'Inventario'} parentTitle={'Inicio'} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Inventario</h4>
                    <div>
                      <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                        <i className="fa-solid fa-file-excel" /> {" "}
                        Exportar reporte
                      </CSVLink>
                      <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                        onClick={() => elemento.current.showEmployeModal()} // Cambiado
                      >+ Agregar Elemento de Inventario</Link> {" "}
                    </div>
                  </div>
                  <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                      <thead>
                        <tr>
                          <th>id</th>
                          <th>Cantidad Disponible</th>
                          <th>Precio de Venta</th>
                          <th>ID Medicamento</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventario.map((dato) => (
                          <tr key={dato.IdInventario}>
                            <td>{dato.IdInventario}</td>
                            <td>{dato.CantidadDisponible}</td>
                            <td>{dato.PrecioVenta}</td>
                            <td>{dato.idMedicamento}</td>
                            <td>{dato.Estado === 1 ? 'Activo' : 'Inactivo'}</td>
                            <div>
                              <Link to={`/edit-inventario/${dato.IdInventario}`} className='btn btn-info'>Editar</Link>
                              <button onClick={() => deleteInventario(dato.IdInventario)} className='btn btn-danger'>Eliminar</button>
                            </div>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        Showing {lastIndex - recordsPage + 1} to{" "}
                        {inventario.length < lastIndex ? inventario.length : lastIndex}
                        {" "}of {inventario.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers justify-content-center"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="#"
                          onClick={prePage}
                        >
                          <i className="fa-solid fa-angle-left" />
                        </Link>
                        <span>
                          {number.map((n, i) => (
                            <Link className={`paginate_button ${currentPage === n ? 'current' : ''} `} key={i}
                              onClick={() => changeCPage(n)}
                            >
                              {n}
                            </Link>
                          ))}
                        </span>
                        <Link
                          className="paginate_button next"
                          to="#"
                          onClick={nextPage}
                        >
                          <i className="fa-solid fa-angle-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InventarioCreate
        ref={elemento}
        Title="Add Inventario"
        reloadInventario={reloadInventario} // Cambiado
      />
    </>
  );
};

export default CompInventarioShow;
