import bcrypt from 'bcrypt';
import USRVCModel from '../Models/USRVCModel.js';
import { registerMovi } from './controllerAuditoria.js';
const tableName = 'usuario';

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

        await USRVCModel.create(newUsuario);

        res.json({
            message: 'Registro creado correctamente'
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};



export const loginUser = async (req, res) => {
    const { Usuario, Contraseña } = req.body;

    try {
      
        const user = await USRVCModel.findOne({
            where: { Usuario: Usuario }, 
        });

        if (!user) {
        
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

     
        const isContraseñaValid = await bcrypt.compare(Contraseña, user.Contraseña);

        if (!isContraseñaValid) {
     
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

