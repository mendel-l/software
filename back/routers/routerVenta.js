import express from 'express'
import { getAllVentas, getVenta, createVenta, updateVenta, deleteVenta } from '../controllers/controllerVenta.js'

const VentaRouter = express.Router()

VentaRouter.get('/', getAllVentas)
VentaRouter.get('/:Idventa', getVenta)
VentaRouter.post('/', createVenta)
VentaRouter.put('/:Idventa', updateVenta)
VentaRouter.delete('/:Idventa', deleteVenta)

export default VentaRouter
