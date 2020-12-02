'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promoteur extends Model {
    static associate(models) {
      Promoteur.hasMany(models.Project);
    }
  };
  Promoteur.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    adr: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Promoteur',
  });
  return Promoteur;
};