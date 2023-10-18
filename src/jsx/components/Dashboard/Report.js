import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MainPagetitle from '../../layouts/MainPagetitle';
import { CSVLink } from 'react-csv';
import axios from 'axios';

const URI = 'http://localhost:3001/api/reports/getExpiredLots'

const Report = () => {       
    const [reporte, setReporte] = useState([]); 
  useEffect(() => {
    getReporte()
  }, [])

  const reloadReportes = () => {
    getReporte();
  };

  //Procedimiento para mostrar todos los roles
  const getReporte = async () =>{
    const res = await axios.get(URI)
    setReporte(res.data)
  }

  const headers = [
    { label: "IDLote", key: "IDLote" },
    { label: "CantidadCompra", key: "CantidadCompra" },
    { label: "CantidadDisponible", key: "CantidadDisponible" },
    { label: "PrecioCompra", key: "PrecioCompra" },
    { label: "Proveedor", key: "Proveedor" },
    { label: "Medicamento", key: "Medicamento" },
    { label: "Fecha_Ingreso", key: "Fecha_Ingreso" },
    { label: "Fecha_Vencimiento", key: "Fecha_Vencimiento" },
    { label: "Estado", key: "Estado" }
   
];
const csvlink = {
    headers : headers,
    data : reporte,
    filename: "Resumen.csv"
};
    

    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 10;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    const records = reporte.slice(firstIndex, lastIndex);
    const npage = Math.ceil(reporte.length / recordsPage)
    const number = [...Array(npage + 1).keys()].slice(1)

    function prePage (){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage (id){
        setCurrentPage(id);
    }
    function nextPage (){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <>
            <MainPagetitle mainTitle="Reports" pageTitle="Generated Report"  parentTitle="Home" /> 
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-xl-12">
                        <div className="card">                            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects manage-client">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Medicamentos Vencidos</h4>
                                        <div>
                                            <CSVLink {...csvlink} className="btn btn-primary light btn-sm">
                                                <i className="fa-solid fa-file-excel" /> {" "} 
                                                Exportar Reporte
                                            </CSVLink> 
                                        </div>
                                        
                                    </div>          
                                    <div id="report-tblwrapper" className="dataTables_wrapper no-footer">
                                        <table id="reports-tbl" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>
                                                    <th>ID LOte</th>
                                                    <th>Cantidad Compra</th>
                                                    <th>Cantidad Disponible</th>
                                                    <th>Precio Compra</th>
                                                    <th>Proveedor</th>
                                                    <th>Medicamento</th>
                                                    <th>Fecha Ingreso</th>
                                                    <th>Fecha Vencimiento</th>
                                                    <th>Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reporte.map((reporte)=>(
                                                    <tr key={reporte.IDLote}>
                                                        <td>{ reporte.IDLote}</td>
                                                        <td>{ reporte.CantidadCompra}</td>
                                                        <td>{ reporte.cantidadDisponible}</td> 
                                                        <td>{ reporte.PrecioCompra}</td>
                                                        <td>{ reporte.Proveedor}</td>
                                                        <td>{ reporte.Medicamento}</td>
                                                        <td>{ reporte.Fecha_Ingreso}</td>
                                                        <td>{ reporte.Fecha_Vencimiento}</td>
                                                        <td>{ reporte.Estado}</td>
                                                        {/* <td>
													        <Link to={"#"} className="text-primary">{item.invoice}</Link>
                                                        </td>    */}  
                                                    </tr>
                                                ))}
                                            </tbody>
                                            
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            
                                            <div className='dataTables_info'>
                                                Showing {lastIndex-recordsPage + 1} to{" "}                                    
                                                {reporte.length < lastIndex ? reporte.length : lastIndex}
                                                {" "}of {reporte.length} entries
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
                                                    {number.map((n , i )=>(
                                                        <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                            onClick={()=>changeCPage(n)}
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
        </>
    );
};

export default Report;