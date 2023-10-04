import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';

const URI = 'http://localhost:3001/api/inventario'; // Cambié la URL a la de inventario

const InventarioCreate = forwardRef((props, ref) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  const [addInventario, setAddInventario] = useState(false);

  useImperativeHandle(ref, () => ({
    showInventarioModal() {
      setAddInventario(true);
    },
  }));

  // Procedimiento para guardar los datos
  const guardar = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al servidor
      await axios.post(URI, {
        Nombre: nombre,
        Descripcion: descripcion,
        Cantidad: cantidad,
        Precio: precio,
      });

      // Cerrar el modal después de guardar los datos
      setAddInventario(false);

      // Recargar la lista de inventario en la página principal
      // props.reloadInventario(); // Debes crear una función similar para recargar el inventario.
    } catch (error) {
      console.error('Error al guardar en el inventario:', error);
    }
  };

  return (
    <>
      <Offcanvas
        show={addInventario}
        onHide={() => setAddInventario(false)}
        className="offcanvas-end customeoff"
        placement="end"
      >
        <div className="offcanvas-header">
          <h5 className="modal-title" id="inventarioModalLabel">Agregar Artículo al Inventario</h5>
          <button type="button" className="btn-close" onClick={() => setAddInventario(false)} />
        </div>
        <div className="offcanvas-body">
          <form onSubmit={guardar}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre del Artículo</label>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">Cantidad</label>
              <input type="number" className="form-control" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">Precio</label>
              <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </Offcanvas>
    </>
  );
});

export default InventarioCreate;
