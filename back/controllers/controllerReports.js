import LoteModel from "../Models/LoteModel.js";
import sequelize from '../DB/database.js';
export const getExpiredLots= async (req, res) => {
    try {
        const query = `
            SELECT *
            FROM lote 
            WHERE Fecha_Vencimiento<now()
        `;
        const [results] = await sequelize.query(query);
        res.json(results);
    } catch (error) {
        res.json({ message: error.message });
    }
}