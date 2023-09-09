const connectionDB = require('../DB/database');

get = ((req, res) => {
    connectionDB.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            console.error('Error al Obtener Datos de la Base de Datos: ' + err);
            res.status(500).json({ error: 'Error al Obtener Datos' });
        } else {
            res.json(result);
        }
    });
});

post = ((req, res) => {
    let { Nombre, Nit, Telefono } = req.body;
    connectionDB.query('INSERT INTO cliente (Nombre, Nit, Telefono, Estado) VALUES (?, ?, ?, 1)', [Nombre, Nit, Telefono], (err, result) => {
        if (err) {
            console.error('Error al insertar Cliente en la Base de Datos: ' + err.message);
            res.status(500).json({ error: 'Error al Insertar Cliente' });
        } else {
            res.json({ message: 'Cliente Ingresado Exitosamente!' });
        }
    });
});

put = ((req, res) => {
    let { idCliente, Nombre, Nit, Telefono, Estado } = req.body;

    connectionDB.query('UPDATE cliente SET Nombre = ?, Nit = ?, Telefono = ?, Estado=? WHERE idCliente = ?', [Nombre, Nit, Telefono, Estado, idCliente], (err, result) => {
        if (err) {
            console.error('Error al actualizar Cliente en la Base de Datos: ' + err.message);
            res.status(500).json({ error: 'Error al actualizar Cliente' });
        } else {
            res.json({ message: 'Cliente actualizado exitosamente!' });
        }
    });
});

remove = ((req, res) => {
    const idCliente = req.params.id;

    connectionDB.query('DELETE FROM `cliente` WHERE idCliente = ?', [idCliente], (err, result) => {
        if (err) {
            console.error('Error al Eliminar Cliente: ' + err.message);
            res.status(500).json({ error: 'Error al Elminar Cliente' });
        } else {
            res.json({ message: 'Cliente Elminado Exitosamente!' });
        }
    });
});

module.exports = {
    get: get,
    post: post,
    put: put,
    remove:remove
};
