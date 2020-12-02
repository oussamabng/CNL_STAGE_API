'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.Promoteur);
    }
  };
  Project.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    code: DataTypes.STRING,
    intitulé: DataTypes.STRING,
    site: DataTypes.STRING,
    commune: DataTypes.STRING,
    quota: DataTypes.NUMBER,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};