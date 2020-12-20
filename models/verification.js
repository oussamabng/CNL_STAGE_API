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
      Verification.belongsTo(models.Dossier);
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
  is_piece_manque:{
    type: DataTypes.BOOLEAN
  },
  is_dossier_avec_reserve:{
    type: DataTypes.BOOLEAN
  },
  is_dossier_bloque:{
    type: DataTypes.BOOLEAN
  },
  date_bloque:{
    type: DataTypes.DATE
  },
  date_debloque:{
    type: DataTypes.DATE
  },
  date_envoie_bordoreau:{
    type: DataTypes.DATE
  },
  date_reception_reserve:{
    type: DataTypes.DATE
  },
  num_bordoreau:{
    type:DataTypes.STRING
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
}, {
    sequelize,
    modelName: 'Verification',
  });
  return Verification;
};