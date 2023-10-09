import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:3001/api/inventario'; // Cambiamos la URL a la de inventario

const CompInventarioEdit = () => {
  const [cantidadDis, setCantidadDisponible] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [IDmedi, setidMedicamento] = useState('');
  const [estado, setEstado] = useState('');
  const { IdInventario } = useParams();

  const navigate = useNavigate();

  // Procedimiento para Actualizar
  const Actualizar = async (e) => {
    e.preventDefault();
    await axios.put(URI + '/' + IdInventario, {
      CantidadDisponible: cantidadDis,
      PrecioVenta: precioVenta,
      idMedicamento: IDmedi, 
      Estado: estado
    });
    navigate('/inventario');
  };

  useEffect(() => {
    getInventarioByID();
  }, []);

  const getInventarioByID = async () => {
    const res = await axios.get(URI + '/' + IdInventario);
    setCantidadDisponible(res.data.CantidadDisponible);
    setPrecioVenta(res.data.PrecioVenta);
    setidMedicamento(res.data.idMedicamento);
    setEstado(res.data.Estado);
  };

  return (
    <div>
      <h3>Editar Elemento de Inventario</h3>
      <div className="offcanvas-body">
        <div className="container-fluid">
          <form onSubmit={Actualizar}>
            <div className="row">
              <div className="col-xl-6 mb-3">
                <label htmlFor="cantidadDisponible" className="form-label">
                  Cantidad Disponible<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={cantidadDis}
                  onChange={(e) => setCantidadDisponible(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label htmlFor="precioVenta" className="form-label">
                  Precio de Venta<span className="text-danger">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={precioVenta}
                  onChange={(e) => setPrecioVenta(e.target.value)}
                  required
                />
              </div>
              <div className="col-xl-6 mb-3">
                <label htmlFor="idMedicamento" className="form-label">
                  ID Medicamento<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={IDmedi}
                  onChange={(e) => setidMedicamento(e.target.value)}
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

export default CompInventarioEdit;

