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
    is_ctrl_rejet:DataTypes.BOOLEAN,
    num_ctrl: DataTypes.STRING,
    nature_ctrl: DataTypes.STRING,
    resultat_ctrl:DataTypes.STRING,
    rejet_ctrl: {
      type: DataTypes.ENUM,
      values:["nv","redressement","recours"]
    },
    date_resultat_ctrl: DataTypes.DATE,
    date_rejet_ctrl: DataTypes.DATE,
    date_ctrl: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ControlRejet',
  });
  return ControlRejet;
};