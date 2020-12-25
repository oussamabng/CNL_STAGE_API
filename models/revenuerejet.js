'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueRejet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RevenueRejet.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    rejet_revenue: DataTypes.BOOLEAN,
    revenue_postulant:DataTypes.STRING,
    revenue_conjoint:DataTypes.STRING,
    date_revenue_rejet:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RevenueRejet',
  });
  return RevenueRejet;
};