import bcrypt from 'bcrypt';
import USRVCModel from '../Models/USRVCModel.js';
import personModel from '../Models/personModel.js';
import {registerIn,registerOut} from "./controllerEntradas.js";
import { registerMovi } from './controllerAuditoria.js';
import jwt from 'jsonwebtoken';
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
            where: { Usuario: Usuario }
        });

        if (!user) {
            console.log('INVALID_DATA user' ) 
            return res.status(401).json({ error: {message: 'INVALID_DATA'} });
        }


        const isContraseñaValid = await bcrypt.compare(Contraseña, user.Contraseña);

        if (!isContraseñaValid) {
            console.log('INVALID_DATA password' ) 
            return res.status(401).json({ error: {message: 'INVALID_DATA'} });
        }

        if(!user.Estado){
            console.log('INVALID_DATA estado' ) 
            return res.status(402).json({error: { message: 'INACTIVE_USER' }});
        }

        const [persona] = await personModel.findAll({
            where: { CUI: user.CUI }
        });
        const token = await generateAuthToken(user,persona);
        console.log(registerIn(user.IDUsuarios));
        console.log('en teoria jalo' ) 
        // res.json({ response: {data} });
        const expireDate = 8*3600;

        res.status(200).json({
            kind : "identitytoolkit#VerifyPasswordResponse",
            localId : user.IDUsuarios,
            email : user.Usuario,
            displayName : persona.Nombres,
            idToken: token,
            registered: true,
            expiresIn: expireDate,
            rol:persona.idRol,
            cui:persona.CUI
        });
        // return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' + error.message});
    }
};

const generateAuthToken = async (user,persona)=>{
    const fechaActual = new Date();
    const iat = Math.floor(fechaActual.getTime() / 1000);
    const exp = iat+(8*3600);
    const payload = {
        // idUser: user.IDUsuarios, // Identificador único del usuario
        // cui: persona.CUI, 
        // user: user.Usuario,
        // role: persona.idRol, 
        iss: "https://identitytoolkit.google.com/",
        aud: "react-course-b798e",
        iat: iat,
        exp: exp,
        user_id: user.IDUsuarios,
        email: user.Usuario,
        sign_in_provider: "password",
        verified: true
    };
    return jwt.sign(payload, 'proyectoFinal');
}
