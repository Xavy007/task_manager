const {Task}=require('../models')


exports.getTasks=async(req,res)=>{
    const tasks=await Task.findAll({
        order:[['id','ASC']]
    })
    res.status(200).json(tasks);
}
exports.createTask=async(req,res)=>{
    const task= await Task.create(req.body);
    res.status(201).json(task);
}
exports.getTaskById=async(req,res)=>{
    const task=await Task.findOne({where: {id: parseInt(req.params.id)}});
    if(!task){
        res.status(404).send("user not found")
    }else{
        res.status(200).json(task)
    }
}
