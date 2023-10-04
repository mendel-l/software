import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:3001/api/inventario'; // Cambiamos la URL a la de inventario

const InventarioEdit = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [estado, setEstado] = useState('');
  const { idInventario } = useParams();

  const navigate = useNavigate();

  // Procedimiento para Actualizar
  const Actualizar = async (e) => {
    e.preventDefault();
    await axios.put(URI + '/' + idInventario, {
      Nombre: nombre,
      Descripcion: descripcion,
      Cantidad: cantidad,
      Precio: precio,
      Estado: estado,
    });
    navigate('/inventario2');
  };

  useEffect(() => {
    getInventarioByID();
  }, []);

  const getInventarioByID = async () => {
    const res = await axios.get(URI + '/' + idInventario);
    setNombre(res.data.Nombre);
    setDescripcion(res.data.Descripcion);
    setCantidad(res.data.Cantidad);
    setPrecio(res.data.Precio);
    setEstado(res.data.Estado);
  };

  return (
    <div>
      <h3>Editar Artículo del Inventario</h3>
      <div className="offcanvas-body">
        <div className="container-fluid">
          <form onSubmit={Actualizar}>
            <div className="row">
              <div className="col-xl-6 mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label htmlFor="cantidad" className="form-label">
                  Cantidad<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label htmlFor="precio" className="form-label">
                  Precio<span className="text-danger">*</span>{" "}
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label htmlFor="estado" className="form-label">
                  Estado<span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary me-1">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventarioEdit;
