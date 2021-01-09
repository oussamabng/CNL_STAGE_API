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
      Dossier.belongsTo(models.Decision);
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
    revenue : DataTypes.STRING,
    date_debut_revenue:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_fin_revenue:{
      type:DataTypes.DATE,
      allowNull:true
    },
    
    date_debut_verification:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_fin_verification:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_debut_verification_reserve:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_fin_verification_reserve:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_debut_cf:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_fin_cf:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_debut_ctrl:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_fin_ctrl:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_debut_aff:{
      type:DataTypes.DATE,
      allowNull:true
    },
    date_fin_aff:{
      type:DataTypes.DATE,
      allowNull:true
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
    num_cf: {
      type: DataTypes.STRING
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
    date_rejet_cf: {
      type: DataTypes.DATE
    },
    date_cf:DataTypes.DATE,
    is_ctrl_rejet:DataTypes.BOOLEAN,
    num_ctrl: DataTypes.STRING,
    nature_ctrl: DataTypes.STRING,
    rejet_ctrl: {
      type: DataTypes.ENUM,
      values:["nv","redressement","recours"]
    },
    resulutat_ctrl:DataTypes.STRING,
    date_resultat_ctrl: DataTypes.DATE,
    date_rejet_ctrl: DataTypes.DATE,
    date_ctrl: DataTypes.DATE,
    rejet_revenue: DataTypes.BOOLEAN,
    revenue_postulant:DataTypes.STRING,
    revenue_conjoint:DataTypes.STRING,
    date_revenue_rejet:DataTypes.DATE

  }, {
    sequelize,
    modelName: 'Dossier',
  }); 
  return Dossier;
};