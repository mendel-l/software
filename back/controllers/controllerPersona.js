import personModel from "../Models/personModel.js";

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
        res.json({
            "message": "Registro Eliminado Exitosamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}