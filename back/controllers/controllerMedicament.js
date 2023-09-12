import MedicamentModel from "../Models/MedicamentModel.js";
import { registerMovi } from "./controllerAuditoria.js";
const tableName = "medicamento"; // NOMBRE DE TABLA PARA LA AUDITORIA

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
        res.json(medicament[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create medicament
export const createMedicament = async (req, res) => {
    try {
        const newMedicament = await MedicamentModel.create(req.body);
        const idRegistroMov = newMedicament.idMedicamento;

        //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------
        await MedicamentModel.findOne({
            order: [['idMedicamento', 'DESC']] // Ordena por la columna "idMedicamento" en orden descendente
        }).then((ultimoRegistro) => {
            let idRegistroMov;
            if (ultimoRegistro) {
                // Si se encontró un registro, obtén su idMedicamento
                idRegistroMov = ultimoRegistro.idMedicamento;
                registerMovi(tableName, idRegistroMov, 1, 1); // El tercer parametro "1", dejemolo así mientras como prueba, ese es el usuario que hizo la modificación, dejémoslo 1 mientras
            } else {
                console.log('No se encontraron registros en la tabla medicamento.');
            }

            res.json({
                "message": "Auditoria registrada"
            });
        }).catch((error) => {
            console.error('Error al registrar auditoria', error);
        });
        //----------------------- FIN ----------------------------------------------------------------------------------
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateMedicament = async (req, res) => {
    try {
        await MedicamentModel.update(req.body, {
            where: { idMedicamento: req.params.idMedicamento }
        });

        //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------

        await registerMovi(tableName, req.params.idMedicamento, 1, 2);

        //----------------------- FIN ----------------------------------------------------------------------------------

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

        //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------

        await registerMovi(tableName, req.params.idMedicamento, 1, 3);

        //----------------------- FIN ----------------------------------------------------------------------------------

        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
