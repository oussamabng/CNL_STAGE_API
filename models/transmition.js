'use strict';
const {
  Model
} = require('sequelize');
const Agent = require("../models/").Agent;

module.exports = (sequelize, DataTypes) => {
  class Transmition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transmition.belongsTo(models.Agent, {
        foreignKey: 'agentId',
        onDelete: 'CASCADE',
      })
    }
  };
  Transmition.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
  },
    date: DataTypes.DATE,
    agentId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: "Agents",
        key: 'id',
      }
    },
    dossierId:{
      type: DataTypes.UUID,
      onDelete:"CASCADE",
      references:{
        model:"Dossiers",
        key:"id"
      }
    }
  }, {
    sequelize,
    modelName: 'Transmition',
  });
  return Transmition;
};