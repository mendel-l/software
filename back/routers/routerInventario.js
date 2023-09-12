import express from 'express';
import { getAllInventarios, getInventario, createInventario, updateInventario, deleteInventario } from '../controllers/controllerInventario.js';

const InventarioRouter = express.Router();

InventarioRouter.get('/', getAllInventarios);
InventarioRouter.get('/:IdInventario', getInventario);
InventarioRouter.post('/', createInventario);
InventarioRouter.put('/:IdInventario', updateInventario);
InventarioRouter.delete('/:IdInventario', deleteInventario);

export default InventarioRouter
