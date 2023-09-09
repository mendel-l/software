import db from "../DB/database.js"

import { DataTypes } from "sequelize";

const RolModel = db.define('rol', {
    idRol: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },Rol: { type: DataTypes.STRING },
    Descripcion: { type: DataTypes.STRING },
    NivelAcceso: { type: DataTypes.NUMBER },
 }, { tableName: 'rol' }); 
 

export default  RolModel