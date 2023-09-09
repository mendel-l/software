const express = require('express');
const routerCliente = express.Router();
const controllerCliente = require('../controllers/controllerCliente.js');

routerCliente.get("/", controllerCliente.get);
routerCliente.post("/insert", controllerCliente.post);
routerCliente.put("/update", controllerCliente.put);
routerCliente.delete("/delete/:id", controllerCliente.remove);


module.exports = routerCliente;


