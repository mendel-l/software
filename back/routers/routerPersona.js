import express from 'express'
import { getAllPersons, createPerson, updatePerson, deletePerson} from '../controllers/controllerPersona.js'

const routerPersona = express.Router()

routerPersona.get('/', getAllPersons)
routerPersona.post('/', createPerson)
routerPersona.put('/:CUI', updatePerson)
routerPersona.delete('/:CUI', deletePerson)

export default routerPersona
