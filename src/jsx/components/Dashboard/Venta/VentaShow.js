import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Modal, Offcanvas } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../../layouts/MainPagetitle';
import VentaCreate from '../../../constant/VentaCreate';
import axios from 'axios';
const URI = 'http://localhost:3001/api/venta'
const CompVentaShow = () => {
  const [venta, setVenta] = useState([]); 
  useEffect(() => {
    getVenta()
  }, [])

  // Esto es para recargar la página al momento de crear un elemento de venta
  const reloadVenta = () => {
    // Esta función se pasará a  Venta Create
    // y se llamará para actualizar el estado local
    getVenta(); // Cambiado
  };

  // Procedimiento para mostrar todos los elementos de venta
  const getVenta = async () => {
    const res = await axios.get(URI);
    setVenta(res.data);
  };

  // Procedimiento para eliminar un elemento de venta
  const deleteVenta = async (Idventa) => {
    await axios.delete(`${URI}/${Idventa}`);
    getVenta(); // Cambiado
  };
  
  const headers = [
    { label: "Idventa", key: "idventa" },
    { label: "Fecha", key: "Fecha" },
    { label: "MontoTotal", key: "MontoTotal" },
    { label: "idCliente", key: "idCliente" },
    { label: "CUI", key: "CUI" },
    { label: "createAt", key: "createAt" },

  ];

  const csvlink = {
    headers: headers,
    data: venta,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = venta.slice(firstIndex, lastIndex); //cambio 1
  const npage = Math.ceil(venta.length / recordsPage);
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
      <MainPagetitle mainTitle="Venta" pageTitle={'Venta'} parentTitle={'Inicio'} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Ventas</h4>
                    <div>
                      <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                        <i className="fa-solid fa-file-excel" /> {" "}
                        Exportar reporte
                      </CSVLink>
                      <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                        onClick={() => elemento.current.showEmployeModal()} // Cambiado
                      >+ Agregar Elemento de Venta</Link> {" "}
                    </div>
                  </div>
                  <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Fecha</th>
                          <th>Monto Total</th>
                          <th>ID Cliente</th>
                          <th>CUI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {venta.map((dato) => (
                          <tr key={dato.Idventa}>
                            <td>{dato.Idventa}</td>
                            <td>{dato.Fecha}</td>
                            <td>{dato.MontoTotal}</td>
                            <td>{dato.idCliente}</td>
                            <td>{dato.CUI}</td>
                            <div>
                              <Link to={`/edit-venta/${dato.Idventa}`} className='btn btn-info'>Editar</Link>
                              <button onClick={() => deleteVenta(dato.Idventa)} className='btn btn-danger'>Eliminar</button>
                            </div>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        Showing {lastIndex - recordsPage + 1} to{" "}
                        {venta.length < lastIndex ? venta.length : lastIndex}
                        {" "}of {venta.length} entries
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
      <VentaCreate
        ref={elemento}
        Title="Add Inventario"
        reloadVenta={reloadVenta} // Cambiado
      />
    </>
  );
};

export default CompVentaShow;