'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liste extends Model {
    static associate(models) {
      Liste.belongsTo(models.Project);
      Liste.hasMany(models.Dossier);
    }
  };
  Liste.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    ref: {
      type:DataTypes.STRING,
      allowNull:false
    },
    nbr_postulant: {
      type:DataTypes.NUMBER,
      allowNull:false
    },
    num_accuse: {
      type:DataTypes.STRING,
      allowNull:false
    },
    date_accuse: {
      type:DataTypes.DATE,
      allowNull:false
    },
    type: {
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Liste',
  });
  return Liste;
};