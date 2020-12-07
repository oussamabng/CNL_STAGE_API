'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dossier extends Model {
    static associate(models) {
      Dossier.belongsTo(models.Postulant);
      Dossier.belongsTo(models.Liste);
      Dossier.hasMany(models.AffRejet);
      Dossier.hasMany(models.CfRejet);
      Dossier.hasMany(models.ControlRejet);
      Dossier.hasMany(models.RevenueRejet);
      Dossier.hasMany(models.Transmition);
      Dossier.hasMany(models.Verification);
    }
  };
  Dossier.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
  },
    n:DataTypes.NUMBER,
    date_reception: DataTypes.DATE,
    num_bordoreau_arrive: DataTypes.STRING,
    date_bordoreau_arrive: DataTypes.DATE,
    num_accuse: DataTypes.NUMBER,
    date_accuse: DataTypes.DATE,
    status: DataTypes.STRING,
    num_bordoreau_envoie:DataTypes.NUMBER,
    date_bordoreau_envoie: DataTypes.DATE,
    date_reception_des_reserve: DataTypes.DATE, 
    revenue_postulant: DataTypes.STRING,
    revenue_conjoint: DataTypes.STRING,
    revenue : DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Dossier',
  }); 
  return Dossier;
};