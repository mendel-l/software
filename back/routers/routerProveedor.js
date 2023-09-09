import express from 'express'
import { getAllProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } from '../controllers/controllerProveedor.js'

const ProveedorRoute = express.Router()

ProveedorRoute.get('/', getAllProveedores)
ProveedorRoute.get('/:IDProveedor', getProveedor)
ProveedorRoute.post('/', createProveedor)
ProveedorRoute.put('/:IDProveedor', updateProveedor)
ProveedorRoute.delete('/:IDProveedor', deleteProveedor)

export default ProveedorRoute
