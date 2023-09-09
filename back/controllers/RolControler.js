import RolModel from "../Models/RolModel.js";

export const getAllRoles = async (req, res) => {
    try {
        const rol = await RolModel.findAll();
        res.json(rol);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getRole = async (req, res) => {
    try {
        const rol = await RolModel.findAll({
            where: { idRol: req.params.idRol }
        });
        RolModel.findAll({
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
        await RolModel.create(req.body);
        res.json({
            "message": "Registro creado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateRole = async (req, res) => {
    try {
        await RolModel.update(req.body, {
            where: { idRol: req.params.idRol }
        });
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
        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
