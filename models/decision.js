'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Decision extends Model {
    static associate(models) {
      Decision.hasOne(models.Dossier)
    }
  };
  Decision.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    montant: {
      type: DataTypes.ENUM,
      values:[40,70]
    },
  }, {
    sequelize,
    modelName: 'Decision',
  });
  return Decision;
};