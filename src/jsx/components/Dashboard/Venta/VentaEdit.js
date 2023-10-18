import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VentaCreate from '../../../constant/VentaCreate'; // Importa el componente necesario para la creación de productos

const URI = 'http://localhost:3001/api/venta';

const CompVentaEdit = () => {
  const [fecha, setFecha] = useState('');
  const [montototal, setMontototal] = useState('');
  const [idcliente, setidCliente] = useState('');
  const [cui, setCui] = useState('');
  const [clientes, setClientes] = useState([]); //lista de clientes disponibles
  const { Idventa } = useParams();
  const navigate = useNavigate();
  const elemento = useRef(); // Ref para el componente VentaCreate

  // Procedimiento para Actualizar
  const Actualizar = async (e) => {
    e.preventDefault();
    await axios.put(`${URI}/${Idventa}`, {
      Fecha: fecha,
      MontoTotal: montototal,
      idCliente: idcliente,
      CUI: cui
    });
    navigate('/venta');
  };

  useEffect(() => {
    getVentaByID();
    // Obtener la lista de clientes disponibles al cargar el componente
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

  const getVentaByID = async () => {
    const res = await axios.get(`${URI}/${Idventa}`);
    setFecha(res.data.Fecha);
    setMontototal(res.data.MontoTotal);
    setidCliente(res.data.idCliente);
    setCui(res.data.CUI);
  };

  return (
    <>
      <div>
        <h3>Editar Elemento de Venta</h3>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={Actualizar}>
              <div className="row">
                <div className="col-xl-6 mb-3">
                  <label htmlFor="fecha" className="form-label">
                    Fecha<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder=""
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                  />
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="montototal" className="form-label">
                    Monto Total<span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    value={montototal}
                    onChange={(e) => setMontototal(e.target.value)}
                    required
                  />
                </div>
                <div className="col-xl-6 mb-3">
                  <label htmlFor="idcliente" className="form-label">
                    ID Cliente<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={idcliente}
                    onChange={(e) => setidCliente(e.target.value)}
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
                  <label htmlFor="cui" className="form-label">
                    CUI<span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    value={cui}
                    onChange={(e) => setCui(e.target.value)}
                    required
                  />
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
      <VentaCreate
        ref={elemento}
        Title="Add Inventario"
        reloadDetalle={() => {}} // Puedes dejarlo vacío o manejarlo según tus necesidades
      />
    </>
  );
};

export default CompVentaEdit;
