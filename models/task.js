'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    estate: DataTypes.STRING,
    deadline: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  Task.associate=(models)=>{
    Task.belongsTo(models.User,{foreignKey:"userId"});
  }
  return Task;
};