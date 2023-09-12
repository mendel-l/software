import express from 'express';
import { getAllDetalles, getDetalle, createDetalle, updateDetalle, deleteDetalle } from '../controllers/controllerDetall_Factura.js';

const Detalle_FacturaRouter = express.Router();

Detalle_FacturaRouter.get('/', getAllDetalles);
Detalle_FacturaRouter.get('/:idDetalle', getDetalle);
Detalle_FacturaRouter.post('/', createDetalle);
Detalle_FacturaRouter.put('/:idDetalle', updateDetalle);
Detalle_FacturaRouter.delete('/:idDetalle', deleteDetalle);

export default Detalle_FacturaRouter
