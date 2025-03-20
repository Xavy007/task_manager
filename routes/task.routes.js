const express= require('express');
const router= express.Router();
const {getTasks, createTask, getTaskById, updateTask, deleteTask, getByIduser, getTasksWithUsers}=require('../controllers/task.controller');

router.get('/tasks',getTasks);
router.post('/tasks',createTask);
router.get('/tasks/:id',getTaskById);
router.put('/tasks/:id',updateTask);
router.delete('/tasks/:id',deleteTask);
router.get('/tasksbyuser/:userId',getByIduser);
router.get('/taskwithusers',getTasksWithUsers);
module.exports=router;