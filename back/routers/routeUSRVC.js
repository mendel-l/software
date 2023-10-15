import express from 'express';
import { createUSRV,loginUser,getAllUsers} from '../controllers/controllerUSRVC.js';
import {registerOut} from '../controllers/controllerEntradas.js'

const usrvroute = express.Router();

usrvroute.post('/', createUSRV);
usrvroute.post('/login', loginUser);
usrvroute.post('/logout', registerOut)
usrvroute.get('/getAll', getAllUsers);



export default usrvroute
