const{User}= require('../models')
const bcrypt= require('bcryptjs');

exports.getUsers=async(req,res)=>{
    const users= await User.findAll({
        attributes: ['id','name', 'email'],
        order:[['id','ASC']]
    });
    res.json(users);
}

exports.createUser=async(req,res)=>{
    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(req.body.password,salt);
    const user={
        name:req.body.name,
        email:req.body.email,
        password:hash
    }
    const us=await User.create(user);
    res.status(201).json(user);
}
exports.getUser=async(req,res)=>{
    console.log(req.params.id);
    const id=parseInt(req.params.id);
    try {
        const user= await User.findByPk(id);
        console.log(user);
        if(!user){
            res.status(404).send("User not Found");
        }else{
            res.status(200).json(user);
        }

    } catch (error) {
        console.log(error)

    }
}

exports.updateUser=async(req,res)=>{
    try {
        const user= await User.findOne({where: req.body.id});
        if(!user){
            res.status(404).send("User not Found");
        }   
        const{ name,email}=req.body;
        user.name=name || user.name;
        user.email=email || user.email;
        await user.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(404).send("User did not update")
    }
}

exports.deleteUser=async(req,res)=>{
    const count= await User.destroy({ where: {id: parseInt(req.params.id)}});
    if(count === 0){
        res.status(404).send("User not found");
    }else{
        res.status(200).json("User Deleted");
    }
}