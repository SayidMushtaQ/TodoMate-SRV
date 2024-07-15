import express from 'express';
import { getAllUsers } from '../controllers/Admin/getAllUser.controller.js';

const router = express.Router(); 

router.route('/getUsers').get(getAllUsers);


export default router;