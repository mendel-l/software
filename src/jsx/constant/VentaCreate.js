import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3001/api/venta';

const VentaCreate = forwardRef((props, ref) => {
  const [fecha, setFecha] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idPersona, setIdPersona] = useState('');
  const [clientes, setClientes] = useState([]);

  const [addVenta, setAddVenta] = useState(false);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const res = await axios.get('http://localhost:3001/api/cliente');
        setClientes(res.data);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    }

    fetchClientes();
  }, []);

  useImperativeHandle(ref, () => ({
    showVentaModal() {
      setAddVenta(true);
    },
  }));

  const guardar = async (e) => {
    e.preventDefault();

    try {
      await axios.post(URI, {
        Fecha: fecha,
        MontoTotal: montoTotal,
        idCliente: idCliente,
        idPersona: idPersona,
      });

      props.reloadVentas();

      setAddVenta(false);
    } catch (error) {
      console.error('Error al guardar la venta:', error);
    }
  };

  return (
    <>
      <Offcanvas show={addVenta} onHide={() => setAddVenta(false)} className="offcanvas-end customeoff" placement="end">
        <div className="offcanvas-header">
          <h5 className="modal-title" id="#gridSystemModal">Agregar Venta</h5>
          <button type="button" className="btn-close" onClick={() => setAddVenta(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={guardar}>
              <div className="row">
                <div className="col-xl-6 mb-3">
                  <label htmlFor="fecha" className="form-label">Fecha<span className="text-danger">*</span></label>
                  <input type="date" className="form-control" placeholder="" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="montoTotal" className="form-label">Monto Total<span className="text-danger">*</span></label>
                  <input type="number" className="form-control" placeholder="" value={montoTotal} onChange={(e) => setMontoTotal(e.target.value.replace(/\D/, ''))} required />
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="idCliente" className="form-label">ID Cliente<span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un Cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.idCliente} value={cliente.idCliente}>
                        {cliente.idCliente} - {cliente.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="idPersona" className="form-label">ID Persona<span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="" value={idPersona} onChange={(e) => setIdPersona(e.target.value.replace(/\D/, ''))} required />
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
