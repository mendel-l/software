import bcrypt from 'bcrypt';
import USRVCModel from '../Models/USRVCModel.js';
import {registerIn,registerOut} from "./controllerEntradas.js";
import { registerMovi } from './controllerAuditoria.js';
const tableName = 'usuario';

export const getAllUsers = async (req, res) => {
    try {
        const user = await USRVCModel.findAll();
        res.json(user);
    } catch (error) {
        res.json({ message: error.message });
    }
}


export const createUSRV = async (req, res) => {
    try {
        const { Usuario, Contraseña, CUI, Estado } = req.body;

    
        const saltRounds = 10;
        const hashedContraseña = await bcrypt.hash(Contraseña, saltRounds);


        const newUsuario = {
            Usuario,
            Contraseña: hashedContraseña,
            CUI,
            Estado,
        };
        
        const [user] = await USRVCModel.findAll({
            where: { Usuario: req.body.Usuario }
        });
        if(user)
        {
            return res.json({ message: "Error: Usuario En Uso, Intente Con Otro" });
        }

        await USRVCModel.create(newUsuario);
        res.json({
            message: 'Registro creado correctamente'
        });

        await USRVCModel.findOne({
            order: [['IDUsuarios', 'DESC']] // Ordena por la columna "IDProveedor" en orden descendente
        }).then((ultimoRegistro) => {
            let idRegistroMov;
            if (ultimoRegistro) {
                // Si se encontró un registro, obtén su IDProveedor
                idRegistroMov = ultimoRegistro.IDUsuarios;
                registerMovi(tableName, idRegistroMov, 1, 1); // El tercer parametro "1", dejemolo asi mientras como prueba, ese es el usuario que hizo la modificacion, dejemolo 1 mientras
            } else {
                console.log('No se encontraron registros en la tabla usuario.');
            }
            console.log("message Auditoria registrada");
        }).catch((error) => {
            console.error('Error al registrar auditoria', error);
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};



export const loginUser = async (req, res) => {
    const { Usuario, Contraseña } = req.body;

    try {
      
        const [user] = await USRVCModel.findAll({
            where: { Usuario: Usuario }, 
        });

        if (!user) {
        
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

     
        const isContraseñaValid = await bcrypt.compare(Contraseña, user.Contraseña);

        if (!isContraseñaValid) {
     
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        
        if(!user.Estado){
            return res.status(401).json({ message: 'Error: Usuario Inactivo' });
        }
        console.log(registerIn(user.IDUsuarios));
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

