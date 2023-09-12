import RolModel from "../Models/RolModel.js";
import { registerMovi } from "./controllerAuditoria.js";
const tableName = "rol"; // NOMBRE DE TABLA PARA LA AUDITORIA

export const getAllRoles = async (req, res) => {
    try {
        const roles = await RolModel.findAll();
        res.json(roles);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getRole = async (req, res) => {
    try {
        const rol = await RolModel.findAll({
            where: { idRol: req.params.idRol }
        });
        res.json(rol[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create role
export const createRole = async (req, res) => {
    try {
        const nuevoRol = await RolModel.create(req.body);
        const idRegistroMov = nuevoRol.idRol;

        //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------
        await RolModel.findOne({
            order: [['idRol', 'DESC']] // Ordena por la columna "idRol" en orden descendente
        }).then((ultimoRegistro) => {
            let idRegistroMov;
            if (ultimoRegistro) {
                // Si se encontró un registro, obtén su idRol
                idRegistroMov = ultimoRegistro.idRol;
                registerMovi(tableName, idRegistroMov, 1, 1); // El tercer parametro "1", dejemolo asi mientras como prueba, ese es el usuario que hizo la modificacion, dejemolo 1 mientras
            } else {
                console.log('No se encontraron registros en la tabla rol.');
            }

            res.json({
                "message": "Auditoria registrada"
            });
        }).catch((error) => {
            console.error('Error al registrar auditoria', error);
        });
        //----------------------- FIN ----------------------------------------------------------------------------------
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateRole = async (req, res) => {
    try {
        await RolModel.update(req.body, {
            where: { idRol: req.params.idRol }
        });

        //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------

        await registerMovi(tableName, req.params.idRol, 1, 2);

        //----------------------- FIN ----------------------------------------------------------------------------------

        res.json({
            "message": "Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteRole = async (req, res) => {
    try {
        await RolModel.destroy({
            where: {
                idRol: req.params.idRol
            }
        });

        //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------

        await registerMovi(tableName, req.params.idRol, 1, 3);

        //----------------------- FIN ----------------------------------------------------------------------------------

        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
