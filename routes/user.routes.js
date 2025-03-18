const express= require('express');
const router= express.Router();
const {getUsers,createUser,updateUser,getUser, deleteUser}= require('../controllers/user.controller');

router.get("/user",getUsers);
router.post("/user",createUser);
router.get("/user/:id",getUser);
router.put("/user/:id",updateUser);
router.delete('/user/:id',deleteUser)

module.exports=router;