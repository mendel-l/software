import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

const URI = 'http://localhost:3001/api/rol'

const CompEditarRol = () => {
    const [rol, setRol] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [nivelacceso, setNivelacceso] = useState('')
    const {idRol} = useParams()

    const navigate = useNavigate();
    //procedimietno para Actualizar
    const Actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI+'/'+idRol,{
            Rol:rol,
            Descripcion:descripcion,
            NivelAcceso:nivelacceso,
        })
        navigate('/rol')
    }

    useEffect(()=>{
        getRolByID()
    },[])

    const getRolByID = async () =>{
        const res = await axios.get(URI+'/'+idRol)  
        setRol(res.data.Rol)
        setDescripcion(res.data.Descripcion)
        setNivelacceso(res.data.NivelAcceso)
    }

    return( 
        <div>
            <h3>Editar Rol</h3>   
        <div className="offcanvas-body">
          <div className="container-fluid">
            <form onSubmit={Actualizar}>
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
                <button type="submit" className="btn btn-primary me-1">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
        </div>
    )
}

export default CompEditarRol