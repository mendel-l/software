import MedicamentModel from "../Models/MedicamentModel.js";

export const getAllMedicaments = async (req, res) => {
    try {
        const medicaments = await MedicamentModel.findAll();
        res.json(medicaments);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getMedicament = async (req, res) => {
    try {
        const medicament = await MedicamentModel.findAll({
            where: { idMedicamento: req.params.idMedicamento }
        });
        MedicamentModel.findAll({
            where: { idMedicamento: req.params.idMedicamento }
        });
        res.json(medicament[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create Medicament
export const createMedicament = async (req, res) => {
    try {
        await MedicamentModel.create(req.body);
        res.json({
            "message": "Registro creado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateMedicament = async (req, res) => {
    try {
        await MedicamentModel.update(req.body, {
            where: { idMedicamento: req.params.idMedicamento }
        });
        res.json({
            "message": "Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteMedicament = async (req, res) => {
    try {
        await MedicamentModel.destroy({
            where: {
                idMedicamento: req.params.idMedicamento
            }
        });
        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
