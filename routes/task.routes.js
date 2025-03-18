const express= require('express');
const router= express.Router();
const {getTasks, createTask, getTaskById}=require('../controllers/task.controller');

router.get('/tasks',getTasks);
router.post('/tasks',createTask);
router.get('/tasks/:id',getTaskById);

module.exports=router;