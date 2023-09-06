const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controlador.js'); 

router.get('/obtener-datos', Controller.obtenerDatos);


module.exports = router;
