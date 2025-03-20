const {Task, User}=require('../models')


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
exports.updateTask=async(req,res)=>{
  try {
    const task=await Task.findOne({where: req.body.id});
    console.log(task)
    const {title, description, estate,deadline,userId}=req.body;
    task.title=title || task.title
    task.description=description || task.description
    task.estate=estate || task.estate
    task.deadline= deadline || task.deadline
    task.userId= userId || task.userId
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(404).send("no actualizado")
  } 
}
exports.deleteTask=async(req,res)=>{
    try {
        const count= await Task.destroy({ where: {id: parseInt(req.params.id)}});
        if(count === 0){
            res.status(404).send("Task not found");
        }else{
            res.status(201).json("Task deleted");
        }
    } catch (error) {
        
    }
}
exports.getByIduser=async(req,res)=>{
    try {
        const tasks=await Task.findAll({
            where:{
                userId:req.params.userId
            }
        });
        if(tasks.length != 0){
            res.status(201).json(tasks);
        }else{
            res.status(404).send("There are not with this user")
        }
        
    } catch (error) {
        
        console.error('Error ',error);
    }
}

exports.getTasksWithUsers= async (req, res) => {
    try {
      const tasks = await Task.findAll({
        include: {
          model: User, 
          attributes: ["name"], 
        },
      });
  
      res.json(tasks);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      res.status(500).json({ message: "Error al obtener tareas" });
    }
  };