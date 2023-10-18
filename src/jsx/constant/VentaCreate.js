import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3001/api/detalle_factura'
//Creacion DETALLE FACTURA
const VentaCreate = forwardRef((props, ref) => {
  const [cantidad, setCantidad] = useState('')
  const [subtotal, setsubTotal] = useState('')
  const [idventa, setIdventa] = useState('')
  const [idinventario, setIdInventario] = useState('');
  const [idlote, setIDLote] = useState('');             //este ta demas pa probar

  const [ventas, setVentas] = useState([]);           //lista de ventas disponibles
  const [inventarios, setInventarios] = useState([]); //Lista de inventarios disponibles
  const [lotes, setLotes] = useState([]);             //Lista de lotes disponibles
  const [medicamentoNames, setMedicamentoNames] = useState([]);
  

  const [addDetalle, setAddDetalle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVentas() { //obtiene la lista de ventas
      try {
        const res = await axios.get('http://localhost:3001/api/venta');
        setVentas(res.data);
      } catch (error) {
        console.error('Error al obtener la lista de ventas:', error);
      }
    }

    async function fetchInventarios() { //obtiene la lista de inventarios
      try {
        const res = await axios.get('http://localhost:3001/api/inventario/active');
        setInventarios(res.data);
      } catch (error) {
        console.error('Error al obtener la lista de inventarios:', error);
      }
    }

    async function fetchLotes() { //obtiene la lista de lotes
      try {
        const res = await axios.get('http://localhost:3001/api/lote/active'); // Cambia la URL según tu API
        setLotes(res.data);
      } catch (error) {
        console.error('Error al obtener la lista de lotes:', error);
      }
    }

    async function fetchMedicamentoNames() {
      try {
        const res = await axios.get('http://localhost:3001/api/medicamento'); // Ajusta la URL según tu API
        setMedicamentoNames(res.data);
      } catch (error) {
        console.error('Error al obtener los nombres de los medicamentos:', error);
      }
    }

    async function fetchData() {
      await fetchVentas();
      await fetchInventarios();
      await fetchLotes();
      await fetchMedicamentoNames(); // Agrega esta línea
    }
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    showEmployeModal() {
      setAddDetalle(true);
    },
  }));

  const getMedicamentoName = (idMedicamento) => {
    const medicamento = medicamentoNames.find((m) => m.idMedicamento === idMedicamento);
    return medicamento ? `${idMedicamento} - ${medicamento.Nombre}` : '';
  };
  
 //procedimietno para guardar los datos
  const guardar = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(URI, {
        Cantidad:cantidad,
        subTotal:subtotal,
        Idventa:idventa,
        IdInventario:idinventario,
        IDLote: idlote,
      });
      
      props.reloadDetalle();

      setAddDetalle(false);
    } catch (error) {
       console.error('Error al guardar el Detalle:', error);
    }
  };
  
  return (
    <>
      <Offcanvas show={addDetalle} onHide={() => setAddDetalle(false)} className="offcanvas-end customeoff" placement="end">
        <div className="offcanvas-header">
          <h5 className="modal-title" id="#gridSystemModal">Agregar Producto</h5>
          <button type="button" className="btn-close" onClick={() => setAddDetalle(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={guardar}>
              <div className="row">
                <div className="col-xl-6 mb-3">
                  <label htmlFor="cantidad" className="form-label">Cantidad<span className="text-danger">*</span></label>
                  <input type="number" className="form-control" placeholder="" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="subtotal" className="form-label">Sub Total<span className="text-danger">*</span></label>
                  <input type="number" className="form-control" placeholder="" value={subtotal} onChange={(e) => setsubTotal(e.target.value)} required/>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="venta" className="form-label">ID Venta<span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={idventa}
                    onChange={(e) => setIdventa(e.target.value)}
                    required
                  >
                    <option value="">Selecciona la Venta</option>
                    {ventas.map((venta) => (
                      <option key={venta.Idventa} value={venta.Idventa}>
                        {venta.Idventa} - Creado {venta.Fecha}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="inventario" className="form-label">ID Inventario<span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={idinventario} // para el id + nombre
                    onChange={(e) => setIdInventario(e.target.value)} // para el id + nombre
                    required
                  >
                    <option value="">Selecciona el Inventario</option>
                    {inventarios.map((inventario) => (
                      <option key={inventario.idinventario} value={inventario.idinventario}>
                        {inventario.IdInventario} - {getMedicamentoName(inventario.idMedicamento)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="lote" className="form-label">Lote<span className="text-danger">*</span></label>
                  <select
                    className="form-select"
                    value={idlote} // para el id + nombre
                    onChange={(e) => setIDLote(e.target.value)} // para el id + nombre
                    required
                  >
                    <option value="">Selecciona un lote</option>
                    {lotes.map((lote) => (
                      <option key={lote.IDLote} value={lote.IDLote}>
                        {lote.IDLote} - Vence {lote.Fecha_Vencimiento}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary me-1">Agregar Producto</button>
                <button type="button" className="btn btn-danger light ms-1" onClick={() => setAddDetalle(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </Offcanvas>
    </>
  );
});

export default VentaCreate;