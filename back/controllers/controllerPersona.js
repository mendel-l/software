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
        const [persona] = await personModel.findAll({
            where: { CUI: req.body.CUI }
        });
        if(persona)
        {
            return res.json({ message: "Datos Duplicados: Ya Hay Un Registro Con Este CUI" });
        }
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

export const getoneP = async (req, res) => {
    try {
        const [client] = await personModel.findAll({
            where: { IdPersona: req.params.IdPersona }
        });
        if(!client)
        {
            return res.status(404).json({ message: "Cliente no Registrado" });
        }
        res.json(client);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updatePerson = async (req, res) => {
    try {
        const [persona] = await personModel.findAll({
            where: { IdPersona: req.params.IdPersona }
        });
        if(!persona)
        {
            return res.status(404).json({ message: "Persona no Registrada" });
        }
        await personModel.update(req.body, {
            where: { IdPersona: req.params.IdPersona }
        });
        await registerMovi(tableName, req.params.IdPersona, 1, 2);
        res.json({
            "message": "Registro Actualizado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deletePerson = async (req, res) => {
    try {
        const [persona] = await personModel.findAll({
            where: { CUI: req.params.CUI }
        });
        if(!persona)
        {
            return res.status(404).json({ message: "Persona no Registrada" });
        }
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