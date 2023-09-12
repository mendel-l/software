import VentaModel from "../Models/VentaModel.js";
import { registerMovi } from "./controllerAuditoria.js";
const tableName = "venta";

export const getAllVentas = async (req, res) => {
    try {
        const ventas = await VentaModel.findAll();
        res.json(ventas);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getVenta = async (req, res) => {
    try {
        const venta = await VentaModel.findAll({
            where: { Idventa: req.params.Idventa }
        });
        res.json(venta[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createVenta = async (req, res) => {
    try {
        const nuevaVenta = await VentaModel.create(req.body);
        const idRegistroMov = nuevaVenta.Idventa;

            await VentaModel.findOne({
                order: [['Idventa', 'DESC']]
            }).then((ultimoRegistro) => {
                let idRegistroMov;
                if (ultimoRegistro) {
                    idRegistroMov = ultimoRegistro.Idventa;
                    registerMovi(tableName, idRegistroMov, 1, 1);
                } else {
                    console.log('No se encontraron registros en la tabla venta.');
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

export const updateVenta = async (req, res) => {
    try {
        await VentaModel.update(req.body, {
            where: { Idventa: req.params.Idventa }
        });

        await registerMovi(tableName, req.params.Idventa, 1, 2);

        res.json({
            "message": "Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteVenta = async (req, res) => {
    try {
        await VentaModel.destroy({
            where: {
                Idventa: req.params.Idventa
            }
        });

        await registerMovi(tableName, req.params.Idventa, 1, 3);

        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
