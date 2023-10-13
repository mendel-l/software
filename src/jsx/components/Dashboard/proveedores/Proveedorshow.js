import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Modal, Offcanvas } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../../layouts/MainPagetitle';
import ProveedorCreate from '../../../constant/ProveedorCreate';
import axios from 'axios';
const URI = 'http://localhost:3001/api/proveedores' //prueba 2 
const CompProveedorShow = () => {
  const [proveedores, setProveedores] = useState([]); 
  useEffect(() => {
    getProveedor()
  }, [])

  //Procedimiento para mostrar todos los proveedores
  const getProveedor = async () =>{
    const res = await axios.get(URI)
    setProveedores(res.data)
  }
  //Procedimiento para eliminar un proveedor
  const deleteProveedor = async (IDProveedor) => {
    await axios.delete('${URI}${IDProveedor}')
    getProveedor()
  }
  
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
    data: proveedores,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = proveedores.slice(firstIndex, lastIndex); //cambio 1
  const npage = Math.ceil(proveedores.length / recordsPage);
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

   const reloadProveedores = () => {
    getProveedor();
  };

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
                        {proveedores.map ( (proveedores) => (
                            <tr key={ proveedores.IDProveedor}>
                                <td>{ proveedores.IDProveedor}</td> 
                                <td>{ proveedores.Nombre}</td>
                                <td>{ proveedores.Direccion}</td>
                                <td>{ proveedores.Telefono}</td>
                                <td>{ proveedores.Descripcion}</td>
                                {/* <td>{ proveedor.Estado}</td> */}
                                <td>{ proveedores.createAt}</td>
                              <div>
                                <Link to={`/edit-proveedor/${proveedores.IDProveedor}`} className='btn btn-info'>Editar</Link>
                                <button onClick={() => deleteProveedor(proveedores.IDProveedor)} className='btn btn-danger'>Eliminar</button>
                              </div>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        {/* cambio 2 */}
                      Showing {lastIndex - recordsPage + 1} to{" "}  
                      {proveedores.length < lastIndex ? proveedores.length : lastIndex}
                      {" "}of {proveedores.length} entries

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
      <ProveedorCreate
        ref={proveedor}
        Title="Add Inventario"
        reloadProveedores={reloadProveedores}
      />
    </>
  );
};

export default CompProveedorShow;
