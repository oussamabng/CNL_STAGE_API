'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Liste.hasMany(models.Dossier);
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
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Liste',
  });
  return Liste;
};