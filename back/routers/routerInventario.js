import express from 'express';
import { getAllInventarios, getInventario, createInventario, updateInventario, deleteInventario, descargarInventario, cargarInventario } 
from '../controllers/controllerInventario.js';

const InventarioRouter = express.Router();

InventarioRouter.get('/', getAllInventarios);
InventarioRouter.get('/:IdInventario', getInventario);
InventarioRouter.post('/', createInventario);
InventarioRouter.put('/:IdInventario', updateInventario);
InventarioRouter.delete('/:IdInventario', deleteInventario);
InventarioRouter.put('/descargar/:IDLote/:total',descargarInventario);
InventarioRouter.put('/cargar/:IDLote/:total',cargarInventario);
export default InventarioRouter
    