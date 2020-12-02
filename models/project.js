'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.hasMany(models.Liste);
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
    promoteur_id:{
      type: DataTypes.UUID,
      references:{
        model:"Promoteurs",
        key:"id"
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};