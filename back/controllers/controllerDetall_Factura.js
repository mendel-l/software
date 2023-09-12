import Detalle_FacturaModel from "../Models/Detalle_FacturaModel.js";
import { registerMovi } from "./controllerAuditoria.js";
const tableName = "detalle_factura";

export const getAllDetalles = async (req, res) => {
    try {
        const detalles = await Detalle_FacturaModel.findAll();
        res.json(detalles);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getDetalle = async (req, res) => {
    try {
        const detalle = await Detalle_FacturaModel.findAll({
            where: { idDetalle: req.params.idDetalle }
        });
        res.json(detalle[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createDetalle = async (req, res) => {
    try {
        const nuevoDetalle = await Detalle_FacturaModel.create(req.body);
        const idRegistroMov = nuevoDetalle.IdDetalle;

        await Detalle_FacturaModel.findOne({
            order: [['IdDetalle', 'DESC']]
        }).then((ultimoRegistro) => {
            let idRegistroMov;
            if (ultimoRegistro) {
                idRegistroMov = ultimoRegistro.IdDetalle;
                registerMovi(tableName, idRegistroMov, 1, 1);
            } else {
                console.log('No se encontraron registros en la tabla detalle_factura.');
            }

            res.json({
                "message": "Auditoria registrada"
            });
        }).catch((error) => {
            console.error('Error al registrar auditoria', error);
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateDetalle = async (req, res) => {
    try {
        await Detalle_FacturaModel.update(req.body, {
            where: {  IdDetalle: req.params. IdDetalle }
        });

        await registerMovi(tableName, req.params.idDetalle, 1, 2);

        res.json({
            "message": "Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteDetalle = async (req, res) => {
    try {
        await Detalle_FacturaModel.destroy({
            where: {
                idDetalle: req.params.idDetalle
            }
        });

        await registerMovi(tableName, req.params.idDetalle, 1, 3);

        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
