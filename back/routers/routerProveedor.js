const express = require('express');
const routerProveedor = express.Router();
const controllerProveedor = require('../controllers/controllerProveedor.js');

routerProveedor.get("/", controllerProveedor.get);
routerProveedor.post("/insert", controllerProveedor.post);
routerProveedor.put("/update", controllerProveedor.put);
routerProveedor.delete("/delete/:id", controllerProveedor.remove);


module.exports = routerProveedor;


