import db from "../DB/database.js"

import { DataTypes } from "sequelize";

const auditoriaModel = db.define('auditoria', {
    IdAuditoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    FechaHora:          { type: DataTypes.DATE },
    Descripcion:        { type: DataTypes.STRING },
    nombreTablaMov:     { type: DataTypes.STRING },
    idRegistroMov:      { type: DataTypes.INTEGER },
    IDUsuarios:         { type: DataTypes.INTEGER },
    idTipoMovimiento:   { type: DataTypes.INTEGER }
}, { tableName: 'auditoria' });


export default auditoriaModel