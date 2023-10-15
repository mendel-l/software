import express from 'express';
import { createUSRV,loginUser,getAllUsers} from '../controllers/controllerUSRVC.js';

const usrvroute = express.Router();

usrvroute.post('/', createUSRV);
usrvroute.post('/login', loginUser);
usrvroute.get('/getAll', getAllUsers);


export default usrvroute
