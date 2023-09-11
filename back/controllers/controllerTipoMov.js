import tipoMovModel from "../Models/tipoMovModel.js";

export const getAllTipoMov = async (req, res) => {
    try {
        const tipoMov = await tipoMovModel.findAll();
        res.json(tipoMov);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createTipoMov = async (req, res) => {
    try {
        await tipoMovModel.create(req.body);
        res.json({
            "message": "Registro Creado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateTipoMov = async (req, res) => {
    try {
        await tipoMovModel.update(req.body, {
            where: { idTipoMovimiento: req.params.idTipoMovimiento }
        });
        res.json({
            "message": "Registro Actualizado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteTipoMov = async (req, res) => {
    try {
        await tipoMovModel.destroy({
            where: {
                idTipoMovimiento: req.params.idTipoMovimiento
            }
        });
        res.json({
            "message": "Registro Eliminado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}