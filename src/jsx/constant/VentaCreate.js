import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3001/api/venta'

const VentaCreate = forwardRef((props, ref) => {
  const [fecha, setFecha] = useState('')
  const [montototal, setMontototal] = useState('')
  const [idcliente, setidCliente] = useState('')
  const [cui, setCui] = useState('')
  const [clientes, setClientes] = useState([]); //lista de clientes disponibles

  const [addVenta, setAddVenta] = useState(false);
  const navigate = useNavigate();

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

  useImperativeHandle(ref, () => ({
    showEmployeModal() {
      setAddVenta(true);
    },
  }));
  
 //procedimietno para guardar los datos
  const guardar = async (e) => {
    e.preventDefault();
    
    //try {
      // Enviar los datos al servidor
      await axios.post(URI, {
        Fecha:fecha,
        MontoTotal:montototal,
        idCliente:idcliente,
        CUI:cui,
      });
      
      props.reloadVenta();
      // Cerrar el modal después de guardar los datos
      setAddVenta(false);

      // Recargar la lista de clientes en la página principal
      //props.reloadProveedores();
    // } catch (error) {
    //   console.error('Error al guardar el proveedor:', error);
    // }
  };
  
  return (
    <>
      <Offcanvas show={addVenta} onHide={() => setAddVenta(false)} className="offcanvas-end customeoff" placement="end">
        <div className="offcanvas-header">
          <h5 className="modal-title" id="#gridSystemModal">Agregar Venta</h5>
          <button type="button" className="btn-close" onClick={() => setAddCliente(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={guardar}>
              <div className="row">
                <div className="col-xl-6 mb-3">
                  <label htmlFor="fecha" className="form-label">Fecha<span className="text-danger">*</span></label>
                  <input type="date" className="form-control" placeholder="" value={fecha} onChange={(e) => setFecha(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="montototal" className="form-label">Monto Total<span className="text-danger">*</span>
                  </label>
                  <input type="number" className="form-control" placeholder="" value={nit} onChange={(e) => setMontototal(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="cliente" className="form-label">ID Cliente<span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={idcliente}
                    onChange={(e) => setidCliente(e.target.value)}
                    required
                  >
                    <option value="">Selecciona al Cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.idCliente} - {cliente.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="cui" className="form-label">CUI<span className="text-danger">*</span>
                  </label>
                  <input type="number" className="form-control" placeholder="" value={cui} onChange={(e) => setCui(e.target.value)} required/>
                </div>

              </div>
              <div>
                <button type="submit" className="btn btn-primary me-1">Guardar</button>
                <button type="button" className="btn btn-danger light ms-1" onClick={() => setAddVenta(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </Offcanvas>
    </>
  );
});

export default VentaCreate;