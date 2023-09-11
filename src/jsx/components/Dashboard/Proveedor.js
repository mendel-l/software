import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Modal, Offcanvas } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../layouts/MainPagetitle';
import ProveedorOffcanvas from '../../constant/ProveedorOffcanvas';
import axios from 'axios';

const Proveedor = () => {
  const [datos, setDatos] = useState([]); 

  useEffect(() => {
    // Realizar una solicitud al servidor Express para obtener los datos
    axios.get('http://localhost:3001/api/Back/obtener-datos') 
      .then((response) => {
        setDatos(response.data); 
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  
  const headers = [
    { label: "IDProveedor", key: "IDProveedor" },
    { label: "Nombre", key: "Nombre" },
    { label: "Direccion", key: "Direccion" },
    { label: "Telefono", key: "Telefono" },
    { label: "Descripcion", key: "Descripcion" },
    { label: "Estado", key: "Estado" },
    { label: "createAt", key: "createAt" },

  ];

  const csvlink = {
    headers: headers,
    data: datos,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = datos.slice(firstIndex, lastIndex);
  const npage = Math.ceil(datos.length / recordsPage);
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

  const proveedor = useRef();

  return (
    <>
      <MainPagetitle mainTitle="Proveedor" pageTitle={'Proveedor'} parentTitle={'Inicio'} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Proveedores</h4>
                    <div>
                      <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                        <i className="fa-solid fa-file-excel" /> {" "}
                        Exportar reporte
                      </CSVLink>
                      <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                        onClick={() => proveedor.current.showEmployeModal()}
                      >+ Agregar Proveedor</Link> {" "}
                    </div>
                  </div>
                  <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                      <thead>
                        <tr>
                          <th>IDProveedor</th>
                          <th>Nombre</th>
                          <th>Direccion</th>
                          <th>Telefono</th>
                          <th>Descripcion</th>
                          <th>Estado</th>
                          <th>createAt</th>
                       
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="products">
                                <div>
                                  <h6>{item.Nombre}</h6>
                                </div>
                              </div>
                            </td>
                            <td><span>{item.idCliente}</span></td>
                            <td>{item.Nit}</td>
                            <td><span>{item.telefono}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        Showing {lastIndex - recordsPage + 1} to{" "}
                        {datos.length < lastIndex ? datos.length : lastIndex}
                        {" "}of {datos.length} entries
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
      <ProveedorOffcanvas
        ref={proveedor}
        Title="Add Inventario"
      />
    </>
  );
};

export default Proveedor;