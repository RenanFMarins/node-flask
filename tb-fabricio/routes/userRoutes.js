const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const userController = require('../controllers/userController');
const User = require('../models/User');


router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUser); // Rota extra para visualizar usuário unico
router.post('/login', userController.postLogin);

module.exports = router;
