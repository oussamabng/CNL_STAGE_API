'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conjoint extends Model {
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
PostulantId:{
  type: DataTypes.UUID,
  references:{
    model:"Postulants",
    key:"id"
  }
}
  }, {
    sequelize,
    modelName: 'Conjoint',
  });
  return Conjoint;
};