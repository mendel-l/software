import bcrypt from 'bcrypt';
import USRVCModel from '../Models/USRVCModel.js';
import personModel from '../Models/personModel.js';
import RolModel from '../Models/RolModel.js';
import {registerIn,registerOut} from "./controllerEntradas.js";
import { registerMovi } from './controllerAuditoria.js';
import jwt from 'jsonwebtoken';
const tableName = 'usuario';

export const getAllUsers = async (req, res) => {
    try {
        const users = await USRVCModel.findAll();
        if (users.length === 0) {
            return res.json({ message: "No se encontraron usuarios." });
        }

        const user = users[0]; // Supongo que quieres el primer usuario, puedes cambiar esto según tus necesidades

        const personas = await personModel.findAll({
            where: { idPersona: user.idPersona }
        });
        if (personas.length === 0) {
            return res.json({ message: "No se encontraron personas asociadas a este usuario." });
        }

        const persona = personas[0]; // Supongo que quieres la primera persona, puedes cambiar esto según tus necesidades

        const roles = await RolModel.findAll({
            where: { idRol: persona.idRol }
        });
        if (roles.length === 0) {
            return res.json({ message: "No se encontraron roles asociados a esta persona." });
        }

        const rol = roles[0]; // Supongo que quieres el primer rol, puedes cambiar esto según tus necesidades

        res.json({
            user,
            Nombres: persona.Nombres,
            Rol: rol.Rol
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const createUSRV = async (req, res) => {
    try {
        const { Usuario, Contraseña, idPersona, Estado } = req.body;

    
        const saltRounds = 10;
        const hashedContraseña = await bcrypt.hash(Contraseña, saltRounds);


        const newUsuario = {
            Usuario,
            Contraseña: hashedContraseña,
            idPersona,
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


/*
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
        const tiempoDeExpiracion = 8 * 3600;
        res.status(200).json({
                data: token,
                expiresIn: tiempoDeExpiracion, // Reemplaza esto con el tiempo de expiración real
                // Otros datos relacionados con el usuario si es necesario
        });
        // return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' + error.message});
    }
};

const generateAuthToken = async (user,persona)=>{
    const payload = {
        // idUser: user.IDUsuarios, // Identificador único del usuario
        // cui: persona.CUI, 
        // user: user.Usuario,
        // role: persona.idRol, 
        email: user.Usuario,
        password: user.Contraseña
    };
    return jwt.sign(payload, 'proyectoFinal');
    return payload;
}*/

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
            where: { idPersona: user.idPersona }
        });
        const [rol] = await RolModel.findAll({
            where: { idRol: persona.idRol }
        });
        const token = await generateAuthToken(user,persona);
        registerIn(user.IDUsuarios)
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
            idpersona:persona.idPersona,
            vProveedores:rol.vProveedores,
            vMedicamentos:rol.vMedicamentos,
            vInventario:rol.vInventario,
            vCliente:rol.vCliente,
            vRol:rol.vRol,
            vLote:rol.vLote,
            vUsuario:rol.vUsuario,
            vVenta:rol.vVenta,
            vPersona:rol.vPersona,
            vReportes:rol.vReportes
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
        verified: false
        
    };
    return jwt.sign(payload, 'proyectoFinal');
}