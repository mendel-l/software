import React, {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { CSVLink } from 'react-csv';
import MainPagetitle from '../../../layouts/MainPagetitle';
import VentaCreate from '../../../constant/VentaCreate';
import axios from 'axios';

const URII = 'http://localhost:3001/api/venta'
const URI = 'http://localhost:3001/api/detalle_factura'

//Creacion Venta
const CompVentaShow = () => {
  //Ventas
  const [fecha, setFecha] = useState('')
  const [montototal, setMontoTotal] = useState('')
  const [idcliente, setidCliente] = useState('')       //variable donde se guaradara el idcliente
  const [clientes, setClientes] = useState([]);        //lista de clientes disponibles
  const [cui, setCUI] = useState('')
  
  const [addVenta, setAddVenta] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    //getVenta()
  }, [])
  
 //procedimietno para guardar los datos
  const guardarVenta = async (e) => {
    e.preventDefault();
    try {
      //Envia los datos al servidor
      await axios.post(URII, {
        Fecha:fecha,
        MontoTotal:montototal,
        idCliente:idcliente,
        CUI:cui,
      });
      
      //props.reloadVentas();
      setAddVenta(false);
    } catch (error) {
       console.error('Error al guardar el Venta:', error);
    }
  };

  useEffect(() => {
    // Obtener la lista de clientes disponibles al cargar el componente
    async function fetchClientes() {
      try {
        const res = await axios.get('http://localhost:3001/api/cliente'); // Cambia la URL según tu API
        setClientes(res.data);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    }
    fetchClientes();
  }, []);


  //DETALLE FACTURA----------------------------------------------------------------
  const [detalles, setDetalle] = useState([]);
  useEffect(() => {
    getDetalle();
  }, []);

  const reloadDetalle= () => {
    getDetalle(); 
  };
  
  // Procedimiento para mostrar todos los elementos del detalle
  const getDetalle = async () => {
    const res = await axios.get(URI);
    setDetalle(res.data);
    };

    // Procedimiento para eliminar un elemento de detalle
  const deleteDetalle = async (IdDetalle) => {
    await axios.delete(`${URI}/${IdDetalle}`);
    getDetalle(); 
  };

  const headers = [
    { label: "IdDetalle", key: "IdDetalle" },
    { label: "Cantidad", key: "Cantidad" },
    { label: "subTotal", key: "subTotal" },
    { label: "Idventa", key: "Idventa" }, 
    { label: "IdInventario", key: "IdInventario" },

  ];

  const csvlink = {
    headers: headers,
    data: detalles,
    filename: "factura.csv"
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPage = 100;
  const lastIndex = currentPage * recordsPage;
  const firstIndex = lastIndex - recordsPage;
  const records = detalles.slice(firstIndex, lastIndex); //cambio 1
  const npage = Math.ceil(detalles.length / recordsPage);
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
                    <h4 className="heading mb-0">Productos</h4>
                    <div>
                      <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                        <i className="fa-solid fa-file-excel" /> {" "}
                        Generar Factura
                      </CSVLink>
                      <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"
                        onClick={() => elemento.current.showEmployeModal()} // Cambiado
                      >+ Agregar Producto</Link> {" "}
                    </div>
                  </div>
                  <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                    <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                      <thead>
                        <tr>
                          <th>ID Detalle</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                          <th>ID Venta</th>
                          <th>ID Inventario</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detalles.map((dato) => (
                          <tr key={dato.IdDetalle}>
                            <td>{dato.IdDetalle}</td>
                            <td>{dato.Cantidad}</td>
                            <td>{dato.subTotal}</td>
                            <td>{dato.Idventa}</td>
                            <td>{dato.IdInventario}</td>
                            <div>
                              <Link to={`/edit-venta/${dato.IdDetalle}`} className='btn btn-info'>Editar</Link>
                              <button onClick={() => deleteDetalle(dato.IdDetalle)} className='btn btn-danger'>Eliminar</button>
                            </div>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className='dataTables_info'>
                        Showing {lastIndex - recordsPage + 1} to{" "}
                        {detalles.length < lastIndex ? detalles.length : lastIndex}
                        {" "}of {detalles.length} entries
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
        reloadDetalle={reloadDetalle} // Cambiado
      />
    </>
  );
};

export default CompVentaShow;