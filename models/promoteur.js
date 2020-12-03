'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promoteur extends Model {
    static associate(models) {
      Promoteur.hasMany(models.Project);
    }
  };
  Promoteur.init({
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    first_name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is:/^[a-z0-9]{4,}$/i
      }
    },
    last_name:  {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is:/^[a-z0-9]{4,}$/i
      }
    },
    phone1: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is:/^0[5|6|7][0-9]{8}$/i
      }
    },
    phone2: {
      type:DataTypes.STRING,
      allowNull: true,
      validate:{
        is:/^0[5|6|7][0-9]{8}$|^$/i,
      }
    },
    adr: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is:    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

      }
    },

  }, {
    sequelize,
    modelName: 'Promoteur',
  });
  return Promoteur;
};