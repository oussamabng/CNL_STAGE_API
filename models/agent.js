'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agent.hasMany(models.Transmition, {
        foreignKey: 'agentId',
      })
    }
  };
  Agent.init(
    {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is:    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

      }
    },
    username:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        is:/^[a-z0-9]{4,}$/i
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    is_admin:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    is_active:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }
  
  }, {
    sequelize,
    modelName: 'Agent',
  });
  return Agent;
};
