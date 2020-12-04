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
    date_rejet_revenue: DataTypes.DATE,
    rejet_revenue: DataTypes.BOOLEAN,
    agent_revenue: {
      type: DataTypes.UUID,
        references:{
          model:"Agent",
          key:"id"
        }
    },
    date_fin: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RevenueRejet',
  });
  return RevenueRejet;
};