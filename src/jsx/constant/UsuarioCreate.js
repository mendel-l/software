import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3001/api/user'

const UsuarioCreate = forwardRef((props, ref) => {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [cui, setCui] = useState('')
  const [estado, setEstado] = useState('')

  const [addUsuario, setAddUsuario] = useState(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    showEmployeModal() {
      setAddUsuario(true);
    },
  }));
  
 //procedimietno para guardar los datos
  const guardar = async (e) => {
    e.preventDefault();
    
    //try {
      // Enviar los datos al servidor
      await axios.post(URI, {
        Usuario:usuario,
        Contrasena:contrasena,
        CUI:cui,
        Estado:estado,
      });
      
      // Cerrar el modal después de guardar los datos
      setAddUsuario(false);

      // Recargar la lista de usuario en la página principal
      //props.reloadProveedores();
    // } catch (error) {
    //   console.error('Error al guardar el proveedor:', error);
    // }
  };
  
  return (
    <>
      <Offcanvas show={addUsuario} onHide={() => setAddUsuario(false)} className="offcanvas-end customeoff" placement="end">
        <div className="offcanvas-header">
          <h5 className="modal-title" id="#gridSystemModal">Agregar Usuario</h5>
          <button type="button" className="btn-close" onClick={() => setAddUsuario(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={guardar}>
              <div className="row">
                <div className="col-xl-6 mb-3">
                  <label htmlFor="usuario" className="form-label">Usuario<span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="" value={usuario} onChange={(e) => setUsuario(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="contrasena" className="form-label">Contraseña<span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" placeholder="" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="cui" className="form-label">CUI<span className="text-danger">*</span></label>
                  <input type="number" className="form-control" placeholder="" value={cui} onChange={(e) => setCui(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                    <label htmlFor="estado" className="form-label">Estado<span className="text-danger">*</span></label>
                    <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)} required>
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>
                    </select>
                </div>

              </div>
              <div>
                <button type="submit" className="btn btn-primary me-1">Guardar</button>
                <button type="button" className="btn btn-danger light ms-1" onClick={() => setAddUsuario(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </Offcanvas>
    </>
  );
});

export default UsuarioCreate;