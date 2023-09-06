const db = require('../DB/database'); 

exports.obtenerDatos = (req, res) => {
  db.query('SELECT * FROM empleados', (err, result) => {
    if (err) {
      console.error('Error al obtener datos de la base de datos: ' + err);
      res.status(500).json({ error: 'Error al obtener datos' });
    } else {
      res.json(result);
    }
  });
};

//Se obtienen los datos de la tabla y se guarda en un json