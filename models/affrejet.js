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
    // agent_aff: {
    //   type: DataTypes.UUID,
    //   references:{
    //     model:"Agent",
    //     key:"id"
    //   }
    // },
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
    // agent_compf: {
    //   type: DataTypes.UUID,
    //   references:{
    //     model:"Agent",
    //     key:"id"
    //   }
    // },
    date_fin: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'AffRejet',
  });
  return AffRejet;
};