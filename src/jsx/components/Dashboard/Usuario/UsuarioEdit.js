import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

const URI = 'http://localhost:3001/api/user'

const CompEditarUsuario = () => {
    const [usuario, setUsuario] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [cui, setCui] = useState('')
    const [estado, setEstado] = useState('')
    const {IDUsuarios} = useParams()

    const navigate = useNavigate();
    //procedimietno para Actualizar
    const Actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI+'/'+IDUsuarios,{
            Usuario:usuario,
            Contrasena:contrasena,
            CUI:cui,
            Estado:estado,
        })
        navigate('/usuario')
    }

    useEffect(()=>{
        getUsuarioByID()
    },[])

    const getUsuarioByID = async () =>{
        const res = await axios.get(URI+'/'+IDUsuarios)  
        setUsuario(res.data.Usuario)
        setContrasena(res.data.Contrasena)
        setCui(res.data.CUI)
        setEstado(res.data.Estado)
    }

    return( 
        <div>
            <h3>Editar Usuario</h3>   
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={Actualizar}>
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
                <button type="submit" className="btn btn-primary me-1">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
        </div>
    )
}

export default CompEditarUsuario