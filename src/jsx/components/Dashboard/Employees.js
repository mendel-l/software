import React, {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Modal, Offcanvas } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

import { IMAGES } from '../../constant/theme';
import MainPagetitle from '../../layouts/MainPagetitle';
import InviteCustomer from '../../constant/ModalList';
import EmployeeOffcanvas from '../../constant/EmployeeOffcanvas';

const tableData =[
        { CUI: '12345678904', Nombre: 'Juna Hernandez', FechaNacimiento: '12/01/2001', Direccion: 'Quetzaltenango', Estado: 'Activo', Telefono: '+502 1234 5575', Salario: 'Q2600', Titulacion: 'Diversificado', Rol: 'Administrador'},
        { CUI: '23456789015', Nombre: 'Carlos Perez', FechaNacimiento: '05/07/1995', Direccion: 'Guatemala City', Estado: 'Inactivo', Telefono: '+502 2345 6789', Salario: 'Q3200', Titulacion: 'Diversificado', Rol: 'Usuario'},
        { CUI: '34567890126', Nombre: 'María González', FechaNacimiento: '20/09/1990', Direccion: 'Mixco', Estado: 'Activo', Telefono: '+502 3456 7890', Salario: 'Q2900', Titulacion: 'Diversificado', Rol: 'Administrador' },
        { CUI: '45678901237', Nombre: 'Luis Méndez', FechaNacimiento: '15/03/1998', Direccion: 'Villa Nueva', Estado: 'Inactivo', Telefono: '+502 4567 8901', Salario: 'Q2400', Titulacion: 'Diversificado', Rol: 'Usuario'},
        { CUI: '56789012348', Nombre: 'Ana Sánchez', FechaNacimiento: '10/11/1993', Direccion: 'Chimaltenango', Estado: 'Activo', Telefono: '+502 5678 9012', Salario: 'Q2800', Titulacion: 'Diversificado', Rol: 'Administrador'},
        { CUI: '67890123459', Nombre: 'David Rodríguez', FechaNacimiento: '25/06/1997', Direccion: 'Escuintla', Estado: 'Inactivo', Telefono: '+502 6789 0123', Salario: 'Q3100', Titulacion: 'Diversificado', Rol: 'Usuario' },
        { CUI: '78901234560', Nombre: 'Laura Martínez', FechaNacimiento: '03/04/1992', Direccion: 'Quetzaltenango', Estado: 'Activo', Telefono: '+502 7890 1234', Salario: 'Q2700', Titulacion: 'Diversificado', Rol: 'Administrador'},
        { CUI: '89012345671', Nombre: 'Mario López', FechaNacimiento: '18/08/1996', Direccion: 'Petén', Estado: 'Inactivo', Telefono: '+502 8901 2345', Salario: 'Q3500', Titulacion: 'Diversificado', Rol: 'Usuario'},
        { CUI: '90123456782', Nombre: 'Sofía García', FechaNacimiento: '29/02/2000', Direccion: 'Huehuetenango', Estado: 'Activo', Telefono: '+502 9012 3456', Salario: 'Q3000', Titulacion: 'Diversificado', Rol: 'Administrador' },
        { CUI: '01234567893', Nombre: 'Eduardo Ramírez', FechaNacimiento: '14/05/1994', Direccion: 'Chiquimula', Estado: 'Inactivo', Telefono: '+502 0123 4567', Salario: 'Q2700', Titulacion: 'Diversificado', Rol: 'Usuario'},
        { CUI: '12345678904', Nombre: 'Andrea Morales', FechaNacimiento: '07/09/1999', Direccion: 'Retalhuleu', Estado: 'Activo', Telefono: '+502 1234 5678', Salario: 'Q3200', Titulacion: 'Diversificado', Rol: 'Administrador'},
        { CUI: '23456789015', Nombre: 'Javier González', FechaNacimiento: '30/12/1991', Direccion: 'Sololá', Estado: 'Inactivo', Telefono: '+502 2345 6789', Salario: 'Q2800', Titulacion: 'Diversificado', Rol: 'Usuario', image: IMAGES.contact1 },
        { CUI: '34567890126', Nombre: 'María Rodríguez', FechaNacimiento: '22/10/1997', Direccion: 'Suchitepéquez', Estado: 'Activo', Telefono: '+502 3456 7890', Salario: 'Q2900', Titulacion: 'Diversificado', Rol: 'Administrador'},
        { CUI: '45678901237', Nombre: 'Carlos Ramírez', FechaNacimiento: '05/08/1995', Direccion: 'Totonicapán', Estado: 'Inactivo', Telefono: '+502 4567 8901', Salario: 'Q2500', Titulacion: 'Diversificado', Rol: 'Usuario'},
        { CUI: '56789012348', Nombre: 'Gabriela Pérez', FechaNacimiento: '18/06/1993', Direccion: 'San Marcos', Estado: 'Activo', Telefono: '+502 5678 9012', Salario: 'Q2700', Titulacion: 'Diversificado', Rol: 'Administrador'}
          ]
  ;

const headers =[
    { label: "CUI", key: "cui" },
    { label: "Nombres", key: "nombres" },
    { label: "FechaNacimiento", key: "fechaNacimiento" },
    { label: "Direccion", key: "direccion" },
    { label: "Estado", key: "estado" },
    { label: "Telefono", key: "telefono" },
    { label: "Salario", key: "salario" },
    { label: "Titulacion", key: "titulacion" },
    { label: "Rol", key: "rol" }
  ]
  

const csvlink = {
    headers : headers,
    data : tableData,
    filename: "csvfile.csv"
}

const Employees = () => {  
    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 10;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tableData.length / recordsPage)
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
   
    const invite = useRef();
    const employe = useRef();
    return (
        <>
            <MainPagetitle mainTitle="Empleados" pageTitle={'Empleados'} parentTitle={'Inicio'} />  
            <div className="container-fluid">
				<div className="row">
			    	<div className="col-xl-12">
                        <div className="card">            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Empleados</h4>                                        
                                        <div>
                                            <CSVLink {...csvlink} className="btn btn-primary light btn-sm me-1">
                                                <i className="fa-solid fa-file-excel" /> {" "} 
                                                Exportar reporte
                                            </CSVLink> 
                                            <Link to={"#"} className="btn btn-primary btn-sm ms-1" data-bs-toggle="offcanvas"                                            
                                                onClick={()=>employe.current.showEmployeModal()}
                                            >+ Agregar Empleado</Link> {" "}
                                        </div>
                                    </div>          
                                    <div id="employee-tbl_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="empoloyees-tblwrapper" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>                                                   
                                                <th>CUI</th>
                                                <th>Nombres</th>
                                                <th>FechaNacimiento</th>
                                                <th>Direccion</th>
                                                <th>Estado</th>
                                                <th>Telefono</th>
                                                <th>Salario</th>
                                                <th>Titulacion</th>
                                                <th>Rol</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {records.map((item, index)=>(
                                                    <tr key={index}>                                                       
                                                        <td><span>{item.CUI}</span></td>
                                                        <td>
                                                            <div className="products">
                                                                
                                                               
                                                                <div>
                                                                    <h6>{item.Nombre}</h6>
                                                                </div>	
                                                            </div>
                                                        </td>
                                                        <td><span>{item.FechaNacimiento}</span></td>
                                                        <td>
                                                            {item.Direccion}
                                                        </td>
                                                        <td>
                                                            <span className={`badge light border-0 ${item.Estado==="Activo" ? 'badge-success' : 'badge-danger'} `}>{item.Estado}</span>
                                                        </td>
                                                        <td>
                                                            <span>{item.Telefono}</span>
                                                        </td>	
                                                        <td>
                                                            <span>{item.Salario}</span>
                                                        </td>
                                                        <td>
                                                            <span>{item.Titulacion}</span>
                                                        </td>
                                                        <td>
                                                            <span>{item.Rol}</span>
                                                        </td>
                                                       
                                                    </tr>
                                                ))}
                                            </tbody>
                                            
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            <div className='dataTables_info'>
                                                Showing {lastIndex-recordsPage + 1} to{" "}                                    
                                                {tableData.length < lastIndex ? tableData.length : lastIndex}
                                                {" "}of {tableData.length} entries
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
            <EmployeeOffcanvas 
                ref={employe}
                Title="Add Employee"
            />
            <InviteCustomer
                ref={invite}       
                Title="Invite Employee"

            />
        </>
    );
};

export default Employees;