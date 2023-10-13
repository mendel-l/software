import express from 'express'
import { getAllMedicaments, getMedicament, createMedicament, updateMedicament, deleteMedicament, getNotAppearInventory } 
from '../controllers/controllerMedicament.js'

const Medicamentroute = express.Router()

Medicamentroute.get('/', getAllMedicaments)
Medicamentroute.get('/:idMedicamento', getMedicament)
Medicamentroute.post('/', createMedicament)
Medicamentroute.put('/:idMedicamento', updateMedicament)
Medicamentroute.delete('/:idMedicamento', deleteMedicament)
Medicamentroute.get('/getNotAppearInventory', getNotAppearInventory)

export default Medicamentroute
