import ClientModel from "../Models/ClientMode.js";
const tableName="cliente";
export const getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.findAll();
        res.json(clients);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getClient = async (req, res) => {
    try {
        const client = await ClientModel.findAll({
            where: { idCliente: req.params.idCliente }
        });
        res.json(client[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create Client
export const createClient = async (req, res) => {
    try {
        await ClientModel.create(req.body);
        res.json({
            "message": "Registro creado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateClient = async (req, res) => {
    try {
        await ClientModel.update(req.body, {
            where: { idCliente: req.params.idCliente }
        });
        res.json({
            "message": "Registro actualizado correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteClient = async (req, res) => {
    try {
        await ClientModel.destroy({
            where: {
                idCliente: req.params.idCliente
            }
        });
        res.json({
            "message": "El registro se borró correctamente"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}
