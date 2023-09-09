import ProveedorModel from "../Models/ProveedoresModel.js";

export const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await ProveedorModel.findAll();
        res.json(proveedores);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getProveedor = async (req, res) => {
    try {
        const proveedor = await ProveedorModel.findAll({
            where: { IDProveedor: req.params.IDProveedor }
        });
        res.json(proveedor[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create Proveedor
export const createProveedor = async (req, res) => {
    try {
        await ProveedorModel.create(req.body);
        res.json({
            "message": "Registro creado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateProveedor = async (req, res) => {
    try {
        await ProveedorModel.update(req.body, {
            where: { IDProveedor: req.params.IDProveedor }
        });
        res.json({
            "message": "Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteProveedor = async (req, res) => {
    try {
        await ProveedorModel.destroy({
            where: {
                IDProveedor: req.params.IDProveedor
            }
        });
        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
