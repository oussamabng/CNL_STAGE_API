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
    code: {
      type:DataTypes.NUMBER,
      allowNull:false,
    },
    intitulé: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    site: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    commune: DataTypes.STRING,
    quota:{
      type:DataTypes.NUMBER,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};