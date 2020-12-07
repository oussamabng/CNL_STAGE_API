'use strict';
const {
  Model
} = require('sequelize');
const Agent = require("../models/").Agent;

module.exports = (sequelize, DataTypes) => {
  class Transmition extends Model {
    static associate(models) {
      Transmition.belongsTo(models.Agent,{constraints: false});
      Transmition.belongsTo(models.Dossier,{constraints: false});
    }
  };
  Transmition.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    AgentId:{
        type:DataTypes.UUID,
        references:{
          model:"Agents",
          key:"id"
        }
    },
    DossierId:{
      type:DataTypes.UUID,
      references:{
        model:"Dossiers",
        key:"id"
      }
  },
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Transmition',
  });
  return Transmition;
};