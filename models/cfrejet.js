'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CfRejet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CfRejet.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    num_cf: {
      type: DataTypes.STRING
    },
    date_cf: {
      type: DataTypes.DATE
    },
    agent_cf: {
      type: DataTypes.UUID,
      references:{
        model:"Agent",
        key:"id"
      }
    },
    resultat_cf: {
      type: DataTypes.BOOLEAN
    },
    date_resultat_cf: {
      type: DataTypes.DATE
    },
    rejet_cf: {
      type: DataTypes.BOOLEAN
    },
    agent_rejet_cf: {
      type: DataTypes.UUID,
      references:{
        model:"Agent",
        key:"id"
      }
    },
    date_rejet_cf: {
      type: DataTypes.DATE
    },
    dossierId:{
      type: DataTypes.UUID,
      onDelete:"CASCADE",
      references:{
        model:"Dossier",
        key:"id"
      }
    },
    date_fin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CfRejet',
  });
  return CfRejet;
};