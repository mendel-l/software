import personModel from "../Models/personModel.js";
import { registerMovi } from "./controllerAuditoria.js"
const tableName = "persona";

export const getAllPersons = async (req, res) => {
    try {
        const persons = await personModel.findAll();
        res.json(persons);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const createPerson = async (req, res) => {
    try {
        await personModel.create(req.body);

            //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------
            await registerMovi(tableName, req.body.CUI, 1, 1);
            //----------------------- FIN ----------------------------------------------------------------------------------

        res.json({
            "message": "Registro Creado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updatePerson = async (req, res) => {
    try {
        await personModel.update(req.body, {
            where: { CUI: req.params.CUI }
        });
        await registerMovi(tableName, req.params.CUI, 1, 2);
        res.json({
            "message": "Registro Actualizado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deletePerson = async (req, res) => {
    try {
        await personModel.destroy({
            where: {
                CUI: req.params.CUI
            }
        });
        await registerMovi(tableName, req.params.CUI, 1, 3);
        res.json({
            "message": "Registro Eliminado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}