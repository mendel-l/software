import express from 'express'
import {getExpiredLots} from '../controllers/controllerReports.js'

const routerReports = express.Router()

routerReports.get('/getExpiredLots', getExpiredLots)

export default routerReports