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
    email:{
      type:DataTypes.STRING,
  },
  username:{
      type: DataTypes.STRING,
  },
  password:{
      type: DataTypes.STRING
  },
  // image:{
  //     type: DataTypes.UUID,
  //     references:{
  //         model:"Uploads",
  //         key:"id"
  //     }
  // },
  is_admin:{
      type: DataTypes.BOOLEAN
  }
  
  }, {
    sequelize,
    modelName: 'Agent',
  });
  return Agent;
};
