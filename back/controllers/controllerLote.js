import LoteModel from "../Models/LoteModel.js";
import { registerMovi } from "./controllerAuditoria.js";
const tableName = "lote";

export const getAllLotes = async (req, res) => {
    try {
        const lotes = await LoteModel.findAll();
        res.json(lotes);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getLote = async (req, res) => {
    try {
        const lote = await LoteModel.findAll({
            where: { IDLote: req.params.IDLote }
        });
        res.json(lote[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createLote = async (req, res) => {
    try {
        const nuevoLote = await LoteModel.create(req.body);
        const idRegistroMov = nuevoLote.IDLote;

            await LoteModel.findOne({
                order: [['IDLote', 'DESC']]
            }).then((ultimoRegistro) => {
                let idRegistroMov;
                if (ultimoRegistro) {
                    idRegistroMov = ultimoRegistro.IDLote;
                    registerMovi(tableName, idRegistroMov, 1, 1);
                } else {
                    console.log('No se encontraron registros en la tabla lote.');
                }

                console.log("message: Auditoria registrada");
            }).catch((error) => {
                console.error('Error al registrar auditoria', error);
            });

        res.json({
            "message": "Registro Creado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateLote = async (req, res) => {
    try {
        await LoteModel.update(req.body, {
            where: { IDLote: req.params.IDLote }
        });

        await registerMovi(tableName, req.params.IDLote, 1, 2);

        res.json({
            "message": "Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteLote = async (req, res) => {
    try {
        await LoteModel.destroy({
            where: {
                IDLote: req.params.IDLote
            }
        });

        await registerMovi(tableName, req.params.IDLote, 1, 3);

        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
