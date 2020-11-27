'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conjoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conjoint.belongsTo(models.Postulant);
    }
  };
  Conjoint.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true
  },
  first_name:{
    type: DataTypes.STRING,
},
last_name:{
    type: DataTypes.STRING,
},
first_name_father:{
    type: DataTypes.STRING,
},
first_name_mother:{
    type: DataTypes.STRING,
},
last_name_mother:{
    type: DataTypes.STRING,
},
place_of_birth:{
    type: DataTypes.STRING
},
date_of_birth:{
    type:DataTypes.DATE
},
gender:{
    type: DataTypes.ENUM,
    values:["M","F"]
},
phone1:{
    type: DataTypes.STRING,
    validate:{
        is:/^[0-9]{10}/i
    }
},
phone2:{
    type: DataTypes.STRING,
    validate:{
        is:/^[0-9]{10}/i
    }
},
email:{
    type:DataTypes.STRING,
    validate:{
        isEmail:true
    }
},
postulant: {
  type:DataTypes.UUID,
  references:{
    model:"Postulant",
    key:"id"
  },
  allowNull:true
},
  }, {
    sequelize,
    modelName: 'Conjoint',
  });
  return Conjoint;
};