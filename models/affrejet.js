'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AffRejet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AffRejet.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    num_aff: {
      type: DataTypes.STRING
    },
    date_aff: {
      type: DataTypes.DATE
    },
    agent_aff: {
      type: DataTypes.UUID,
      references:{
        model:"Agent",
        key:"id"
      }
    },
    caisse: {
      type: DataTypes.ENUM,
      values:["CASNOS","CNAS","CNR"]
    },
    resultat_aff: {
      type: DataTypes.BOOLEAN
    },
    date_resultat: {
      type: DataTypes.DATE
    },
    comformite: {
      type: DataTypes.BOOLEAN
    },
    agent_compf: {
      type: DataTypes.UUID,
      references:{
        model:"Agent",
        key:"id"
      }
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
    modelName: 'AffRejet',
  });
  return AffRejet;
};