import express from 'express';
import { getAllLotes, getLote, createLote, updateLote, deleteLote } from '../controllers/controllerLote.js';

const LoteRouter = express.Router();

LoteRouter.get('/', getAllLotes);
LoteRouter.get('/:IDLote', getLote);
LoteRouter.post('/', createLote);
LoteRouter.put('/:IDLote', updateLote);
LoteRouter.delete('/:IDLote', deleteLote);

export default LoteRouter
