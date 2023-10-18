import express from 'express'
import { getAllPersons, createPerson, updatePerson, deletePerson,getAllPersonsActive} from '../controllers/controllerPersona.js'

const routerPersona = express.Router()

routerPersona.get('/', getAllPersons)
routerPersona.get('/active', getAllPersonsActive)
routerPersona.post('/', createPerson)
routerPersona.put('/:CUI', updatePerson)
routerPersona.delete('/:CUI', deletePerson)

export default routerPersona
