'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dossier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dossier.belongsTo(models.Liste);
      Dossier.hasOne(models.Postulant);
    }
  };
  Dossier.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
  },
    date_reception: DataTypes.DATE,
    num_bordoreau_arrive: DataTypes.STRING,
    date_bordoreau_arrive: DataTypes.DATE,
    num_accuse: DataTypes.NUMBER,
    date_accuse: DataTypes.DATE,
    postulant: {
      type:DataTypes.UUID,
      references:{
        model:"Postulant",
        key:"id"
      },
      allowNull:true
    },
    liste_id:{
      type:DataTypes.UUID,
      references:{
        model:"Liste",
        key:"id"
      },
      allowNull:true
    },
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