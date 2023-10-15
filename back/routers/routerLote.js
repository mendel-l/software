import express from 'express';
import { getAllLotes, getLote, createLote, updateLote, deleteLote, getSumLotes, getAllLotesById } from '../controllers/controllerLote.js';

const LoteRouter = express.Router();

LoteRouter.get('/', getAllLotes);
LoteRouter.get('/getSumLotes/:idMedicamento', getSumLotes);// Obtener la "cantidadDisponible" que se guarda al crear nuevo inventario, que se hace automaticamente
LoteRouter.get('/getAllLotesById/:idMedicamento', getAllLotesById);
LoteRouter.get('/:IDLote', getLote);
LoteRouter.post('/', createLote);
LoteRouter.put('/:IDLote', updateLote);
LoteRouter.delete('/:IDLote', deleteLote);

export default LoteRouter
