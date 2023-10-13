import express from 'express';
import { createUSRV,loginUser} from '../controllers/controllerUSRVC.js';

const usrvroute = express.Router();

usrvroute.post('/', createUSRV);
usrvroute.post('/login', loginUser);


export default usrvroute
