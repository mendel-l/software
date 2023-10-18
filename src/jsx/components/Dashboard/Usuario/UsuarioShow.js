import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Modal, Offcanvas } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../../layouts/MainPagetitle';
import UsuarioCreate from '../../../constant/UsuarioCreate';
import axios from 'axios';
const URI = 'http://localhost:3001/api/Usrv'
const CompUsuarioShow = () => {
  const [usuarios, setUsuarios] = useState([]); 
  useEffect(() => {
    getUsuario()
  }, [])

  //Procedimiento para mostrar todos los usuarios
  const getUsuario = async () =>{
    const res = await axios.get(URI+"/getAll")
    setUsuarios(res.data)
  }
  //Procedimiento para eliminar un usuario
  const deleteUsuario = async (IDUsuarios) => {
    await axios.delete('${URI}${IDUsuarios}')
    getUsuario()
  }
  
  const headers = [
    { label: "IDUsuarios", key: "IDUsuarios" },
    { label: "Usuario", key: "Usuario" },
    { label: "Contraseña", key: "Contraseña" },
    { label: "CUI", key: "CUI" },
    { label: "Estado", key: "Estado" },
    { label: "createAt", key: "createAt" },

  ];

  const csvlink = {
    headers: headers,
    data: usuarios,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = usuarios.slice(firstIndex, lastIndex); //cambio 1
  const npage = Math.ceil(usuarios.length / recordsPage);
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

  const usuario = useRef();

  return (
    <>
      <MainPagetitle mainTitle="Usuario" pageTitle={'Usuario'} parentTitle={'Inicio'} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Usuarios</h4>
                    <div>
                      <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                        <i className="fa-solid fa-file-excel" /> {" "}
                        Exportar reporte
                      </CSVLink>
                      <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                        onClick={() => usuario.current.showEmployeModal()}
                      >+ Agregar Usuario</Link> {" "}
                    </div>
                  </div>
                  <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                      <thead>
                        <tr>
                          <th>IDUsuario</th>
                          <th>Usuario</th>
                          <th>Contraseña</th>
                          <th>CUI</th>
                          <th>Estado</th>
                          <th>createAt</th>
                       
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map ( (usuarios) => (
                            <tr key={ usuarios.IDUsuarios}>
                                <td>{ usuarios.IDUsuarios}</td> 
                                <td>{ usuarios.Usuario}</td>
                                <td>{ usuarios.Contraseña}</td>
                                <td>{ usuarios.CUI}</td>
                                <td>{ usuarios.createAt}</td>
                              <div>
                                <Link to={`/edit-usuario/${usuarios.IDUsuarios}`} className='btn btn-info'>Editar</Link>
                                <button onClick={() => deleteUsuario(usuarios.IDUsuarios)} className='btn btn-danger'>Eliminar</button>
                              </div>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        {/* cambio 2 */}
                      Mostrado {lastIndex - recordsPage + 1} to{" "}  
                      {usuarios.length < lastIndex ? usuarios.length : lastIndex}
                      {" "}of {usuarios.length} entries

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
      <UsuarioCreate
        ref={usuario}
        Title="Add Inventario"
      />
    </>
  );
};

export default CompUsuarioShow;