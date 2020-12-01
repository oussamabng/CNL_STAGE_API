'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liste extends Model {
    static associate(models) {
      Liste.hasMany(models.Dossier);
      Liste.belongsTo(models.Project);
    }
  };
  Liste.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    ref: DataTypes.STRING,
    date: DataTypes.DATE,
    nbr_postulant: DataTypes.NUMBER,
    code_project: DataTypes.STRING,
    num_accuse: DataTypes.STRING,
    date_accuse: DataTypes.DATE,
    type: DataTypes.STRING,
    project_id:{
      type: DataTypes.UUID,
      references:{
        model:"Projects",
        key:"id"
      },
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Liste',
  });
  return Liste;
};