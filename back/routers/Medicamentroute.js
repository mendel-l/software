import express from 'express'
import { getAllMedicaments, getMedicament, createMedicament, updateMedicament, deleteMedicament } from '../controllers/MedicamentControler.js'

const Medicamentroute = express.Router()

Medicamentroute.get('/', getAllMedicaments)
Medicamentroute.get('/:idMedicamento', getMedicament)
Medicamentroute.post('/', createMedicament)
Medicamentroute.put('/:idMedicamento', updateMedicament)
Medicamentroute.delete('/:idMedicamento', deleteMedicament)

export default Medicamentroute
