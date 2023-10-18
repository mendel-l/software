import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../../layouts/MainPagetitle';
import VentaCreate from '../../../constant/VentaCreate'; // Cambiado
import axios from 'axios';

const URI = 'http://localhost:3001/api/venta'; // Cambiado

const VentaShow = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]); // Agregado
  const [personas, setPersonas] = useState([]); // Agregado

  const [selectedClientId, setSelectedClientId] = useState(''); //x

  useEffect(() => {
    getVentas();
    fetchClientes(); // Agregado
    fetchPersonas(); // Agregado
  }, []);

  // Esto es para recargar la página al momento de crear un elemento de venta
  const reloadVentas = () => {
    // Esta función se pasará a VentaCreate
    // y se llamará para actualizar el estado local
    getVentas(); // Cambiado
  };

  const [showSecondModal, setShowSecondModal] = useState(false);
  const [textBoxContent, setTextBoxContent] = useState('');

  const openSecondModal = () => {
    setShowSecondModal(true);
    setSelectedClientId('');
  }; //x

  const fetchClientes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/clientes');
      setClientes(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de clientes:', error);
    }
  };

  const fetchPersonas = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/persona');
      setPersonas(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de personas:', error);
    }
  };

  const getVentas = async () => {
    try {
      const res = await axios.get(URI);
      setVentas(res.data);
    } catch (error) {
      console.error('Error al obtener la lista de ventas:', error);
    }
  };

  // Procedimiento para eliminar un elemento de venta
  const deleteVenta = async (idVenta) => {
    await axios.delete(`${URI}/${idVenta}`);
    getVentas(); // Cambiado
  };

  const headers = [
    { label: "Idventa", key: "Idventa" },
    { label: "Fecha", key: "Fecha" },
    { label: "MontoTotal", key: "MontoTotal" },
    { label: "idCliente ", key: "idCliente " },
    { label: "idPersona", key: "idPersona" },
  ];

  const csvlink = {
    headers: headers,
    data: ventas,
    filename: "csvfile.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = ventas.slice(firstIndex, lastIndex); // Cambiado
  const npage = Math.ceil(ventas.length / recordsPage);
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
  
  const fecha = useState(new Date().toISOString().split('T')[0]); // Obtiene la fecha actual

  async function callAPIPostVenta(clientId) {
    const tokenData = JSON.parse(localStorage.getItem('userDetails'));
    const requestData = { 
      idCliente: clientId,
      Fecha: fecha[0],
      MontoTotal: 0,
      idPersona: tokenData.idpersona
     };
    console.log(requestData);
    const response = await axios.post(
        `http://localhost:3001/api/venta`,
        requestData,
    );
    const idVenta = response.data.idRegistroMov;
    console.log(idVenta);
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
                    <h4 className="heading mb-0">Venta</h4>
                    <div>
                      
                    <div className="mb-3">
                    <label htmlFor="clienteCombobox" className="form-label">
                    </label>
                    <select
                      id="clienteCombobox"
                      className="form-select"
                      value={selectedClientId}
                      onChange={(e) => {
                        setSelectedClientId(e.target.value); // Actualiza el estado con el cliente seleccionado
                        callAPIPostVenta(e.target.value); // Llama a tu función con el cliente seleccionado
                      }}

                    >
                      <option value="">Selecciona un Cliente</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.idCliente} value={cliente.idCliente}>
                          {cliente.idCliente} - {cliente.Nombre}
                        </option>
                      ))}
                    </select>
                    </div> 

                      <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                        <i className="fa-solid fa-file-excel" /> {" "}
                        Exportar reporte
                      </CSVLink>
                      <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                        onClick={() => elemento.current.showVentaModal()} // Cambiado
                      >+ Agregar Venta</Link> {" "}
                    </div>
                  </div>
                  <div id="venta-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table id="venta-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Fecha</th>
                          <th>Monto Total</th>
                          <th>ID Cliente</th>
                          <th>ID Persona</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {ventas.map((dato) => (
                          <tr key={dato.Idventa}>
                            <td>{dato.Idventa}</td>
                            <td>{dato.Fecha}</td>
                            <td>{dato.MontoTotal}</td>
                            <td>
                              {dato.idCliente} - {clientes.find(cliente => cliente.idCliente === dato.idCliente)?.Nombre}
                            </td>
                            <td>
                              {dato.idPersona} - {personas.find(persona => persona.idPersona === dato.idPersona)?.Nombres}
                            </td>
                            <div>
                              <td>{<Link to={`/edit-venta/${dato.Idventa}`} className='btn btn-info'>Editar</Link>}</td>
                            </div>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        Showing {lastIndex - recordsPage + 1} to{" "}
                        {ventas.length < lastIndex ? ventas.length : lastIndex}
                        {" "}of {ventas.length} entries
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
        Title="Add Venta"
        reloadVentas={reloadVentas} // Cambiado
      />
    </>
  );
};

export default VentaShow;
