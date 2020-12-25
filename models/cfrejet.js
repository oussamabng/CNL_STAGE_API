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
    date_cf:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CfRejet',
  });
  return CfRejet;
};