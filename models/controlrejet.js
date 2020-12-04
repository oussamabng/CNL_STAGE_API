'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControlRejet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ControlRejet.init({
    num_ctrl: DataTypes.STRING,
    date_ctrl: DataTypes.DATE,
    agent_ctrl: {
      type: DataTypes.UUID,
      references:{
        model:"Agent",
        key:"id"
      }
    },
    resultat_ctrl:{
      type: DataTypes.BOOLEAN
    },
    nature_ctrl: DataTypes.STRING,
    date_resultat_ctrl: DataTypes.DATE,
    rejet_ctrl: {
      type: DataTypes.ENUM,
      values:["nv","redressement","recours"]
    },
    date_rejet: DataTypes.DATE,
    date_fin:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ControlRejet',
  });
  return ControlRejet;
};