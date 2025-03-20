const express= require('express');
const router= express.Router();
const {login,register,getProfile}=require('../controllers/auth.controller');
const verificarToken= require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/perfil', verificarToken, getProfile);

module.exports=router;