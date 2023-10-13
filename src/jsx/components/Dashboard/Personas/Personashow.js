import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../../layouts/MainPagetitle';
import PersonaCreate from '../../../constant/PersonaCreate'; // Cambiado
import axios from 'axios';

const URI = 'http://localhost:3001/api/persona'; // Cambiado

const PersonaShow = () => {
  const [personas, setPersonas] = useState([]); // Cambiado
  useEffect(() => {
    getPersonas(); // Cambiado
  }, []);

  // Esto es para recargar la página al momento de crear una persona
  const reloadPersonas = () => {
    // Esta función se pasará a PersonaCreate
    // y se llamará para actualizar el estado local
    getPersonas(); // Cambiado
  };

  // Procedimiento para mostrar todas las personas
  const getPersonas = async () => {
    const res = await axios.get(URI);
    setPersonas(res.data);
  };

  // Procedimiento para eliminar una persona
  const deletePersona = async (CUI) => {
    await axios.delete(`${URI}/${CUI}`);
    getPersonas(); // Cambiado
  };

  const headers = [
    { label: "ID Rol", key: "IDRol" },
    { label: "CUI", key: "CUI" },
    { label: "Nombre", key: "Nombre" },
    { label: "Fecha de Nacimiento", key: "FechaNacimiento" },
    { label: "Direccion", key: "Direccion" },
    { label: "Telefono", key: "Telefono" },
    { label: "Salario", key: "Salario" },
    { label: "Titulacion", key: "Titulacion" },
    { label: "Estado", key: "Estado" },
  ];

  const csvlink = {
    headers: headers,
    data: personas,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = personas.slice(firstIndex, lastIndex); // Cambiado
  const npage = Math.ceil(personas.length / recordsPage);
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
      <MainPagetitle mainTitle="Persona" pageTitle={'Persona'} parentTitle={'Inicio'} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Persona</h4>
                    <div>
                      <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                        <i className="fa-solid fa-file-excel" /> {" "}
                        Exportar reporte
                      </CSVLink>
                      <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                        onClick={() => elemento.current.showPersonaModal()} // Cambiado
                      >+ Agregar Persona</Link> {" "}
                    </div>
                  </div>
                  <div id="persona-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table id="persona-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                      <thead>
                        <tr>
                          <th>ID Rol</th>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Fecha de Nacimiento</th>
                          <th>Direccion</th>
                          <th>Telefono</th>
                          <th>Salario</th>
                          <th>Titulacion</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {personas.map((dato) => (
                          <tr key={dato.CUI}>
                            <td>{dato.IDRol}</td>
                            <td>{dato.CUI}</td>
                            <td>{dato.Nombre}</td>
                            <td>{dato.FechaNacimiento}</td>
                            <td>{dato.Direccion}</td>
                            <td>{dato.Telefono}</td>
                            <td>{dato.Salario}</td>
                            <td>{dato.Titulacion}</td>
                            <td>{dato.Estado === 1 ? 'Activo' : 'Inactivo'}</td>
                            <div>
                              <Link to={`/edit-persona/${dato.CUI}`} className='btn btn-info'>Editar</Link>
                              <button onClick={() => deletePersona(dato.CUI)} className='btn btn-danger'>Eliminar</button>
                            </div>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        Showing {lastIndex - recordsPage + 1} to{" "}
                        {personas.length < lastIndex ? personas.length : lastIndex}
                        {" "}of {personas.length} entries
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
      <PersonaCreate
        ref={elemento}
        Title="Add Persona"
        reloadPersonas={reloadPersonas} // Cambiado
      />
    </>
  );
};

export default PersonaShow;
