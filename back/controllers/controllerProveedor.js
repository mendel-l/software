const connectionDB = require('../DB/database');

get = ((req, res) => {
    connectionDB.query('SELECT * FROM proveedor', (err, result) => {
        if (err) {
            console.error('Error al obtener datos de la base de datos: ' + err);
            res.status(500).json({ error: 'Error al obtener datos' });
        } else {
            res.json(result);
        }
    });
});

post = ((req, res) => {
    let { Nombre, Direccion, Telefono, Descripcion } = req.body;
    connectionDB.query('INSERT INTO proveedor (Nombre, Direccion, Telefono, Descripcion, Estado ) VALUES (?, ?, ?, ?, 1)', [Nombre, Direccion, Telefono, Descripcion], (err, result) => {
        if (err) {
            console.error('Error al insertar Proveedor en la Base de Datos: ' + err.message);
            res.status(500).json({ error: 'Error al Insertar Proveedor' });
        } else {
            res.json({ message: 'Proveedor Ingresado Exitosamente!' });
        }
    });
});

put = ((req, res) => {
    let { IDProveedor, Nombre, Direccion, Telefono, Descripcion, Estado } = req.body;

    connectionDB.query('UPDATE proveedor SET Nombre = ?, Direccion = ?, Telefono = ?, Descripcion=?, Estado=? WHERE IDProveedor = ?', [Nombre, Direccion, Telefono, Descripcion, Estado, IDProveedor], (err, result) => {
        if (err) {
            console.error('Error al actualizar Proveedor en la Base de Datos: ' + err.message);
            res.status(500).json({ error: 'Error al actualizar Proveedor' });
        } else {
            res.json({ message: 'Proveedor actualizado exitosamente!' });
        }
    });
});

remove = ((req, res) => {
    const IDProveedor = req.params.id;

    connectionDB.query('DELETE FROM `proveedor` WHERE IDProveedor = ?', [IDProveedor], (err, result) => {
        if (err) {
            console.error('Error al Eliminar Proveedor: ' + err.message);
            res.status(500).json({ error: 'Error al Elminar Proveedor' });
        } else {
            res.json({ message: 'Proveedor Elminado Exitosamente!' });
        }
    });
});

module.exports = {
    get: get,
    post: post,
    put: put,
    remove:remove
};
