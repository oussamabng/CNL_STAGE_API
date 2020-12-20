'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AffRejet extends Model {
    static associate(models) {
      AffRejet.belongsTo(models.Dossier);
      AffRejet.belongsTo(models.Postulant,{foreignKey:"agent_aff"});
      AffRejet.belongsTo(models.Postulant,{foreignKey:"agent_compf"});
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
    caisse: {
      type: DataTypes.ENUM,
      values:["CASNOS","CNAS","CNR"]
    },
    resultat_aff: {
      type: DataTypes.BOOLEAN
    },
    comformite: {
      type: DataTypes.BOOLEAN
    },

  }, {
    sequelize,
    modelName: 'AffRejet',
  });
  return AffRejet;
};