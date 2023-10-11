import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3001/api/rol'

const RolCreate = forwardRef((props, ref) => {
  const [rol, setRol] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [nivelacceso, setNivelacceso] = useState('')

  const [addRol, setAddRol] = useState(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    showEmployeModal() {
      setAddRol(true);
    },
  }));
  
 //procedimietno para guardar los datos
  const guardar = async (e) => {
    e.preventDefault();
    
    //try {
      // Enviar los datos al servidor
      await axios.post(URI, {
        Rol:rol,
        Descripcion:descripcion,
        NivelAcceso:nivelacceso,
      });
      
      // Cerrar el modal después de guardar los datos
      setAddRol(false);

      // Recargar la lista de roles en la página principal
      //props.reloadProveedores();
    // } catch (error) {
    //   console.error('Error al guardar el proveedor:', error);
    // }
  };
  
  return (
    <>
      <Offcanvas show={addRol} onHide={() => setAddRol(false)} className="offcanvas-end customeoff" placement="end">
        <div className="offcanvas-header">
          <h5 className="modal-title" id="#gridSystemModal">Agregar Rol</h5>
          <button type="button" className="btn-close" onClick={() => setAddRol(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={guardar}>
              <div className="row">
                <div className="col-xl-6 mb-3">
                  <label htmlFor="rol" className="form-label">Rol<span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="" value={rol} onChange={(e) => setRol(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripcion<span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" placeholder="" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="nivelacceso" className="form-label">Nivel Acceso<span className="text-danger">*</span></label>
                  <input type="number" className="form-control" placeholder="" value={nivelacceso} onChange={(e) => setNivelacceso(e.target.value)} required/>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary me-1">Guardar</button>
                <button type="button" className="btn btn-danger light ms-1" onClick={() => setAddRol(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </Offcanvas>
    </>
  );
});

export default RolCreate;