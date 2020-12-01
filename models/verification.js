'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Verification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Verification.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
  },
  agent_verificateur:{
    type:DataTypes.UUID,
    references:{
      model:"Agents",
      key:"id"
    },
    allowNull:true
  },
  date_debut_verification:{
    type: DataTypes.DATE
  },
  is_piece_manque:{
    type: DataTypes.BOOLEAN
  },
  is_dossier_avec_reserve:{
    type: DataTypes.BOOLEAN
  },
  is_dossier_bloque:{
    type: DataTypes.BOOLEAN
  },
  date_fin_verification:{
    type: DataTypes.DATE
  },
  dossierId:{
    type: DataTypes.UUID,
    onDelete:"CASCADE",
    references:{
      model:"Dossiers",
      key:"id"
    },
    allowNull:true
  },
  date_bloque:{
    type: DataTypes.DATE
  },
  date_debloque:{
    type: DataTypes.DATE
  },
  agent_debloqueur:{
    type: DataTypes.UUID,
    onDelete:"CASCADE",
    references:{
      model:"Agents",
      key:"id"
    },
    allowNull:true
  },
  date_fin: DataTypes.DATE
}, {
    sequelize,
    modelName: 'Verification',
  });
  return Verification;
};