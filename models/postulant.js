'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Postulant extends Model {
    static associate(models) {
        Postulant.hasOne(models.Dossier);
        Postulant.hasMany(models.Conjoint);
    }
  };
  Postulant.init({
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
family_situation:{
    type: DataTypes.ENUM,
    values:["Single","Married","Widower","Divorced"],
},
  n_liste:{
      type: DataTypes.STRING,
      validate:{
          is:/^[0-9]/i,
      }
  },
  date_verification:{
      type: DataTypes.DATE
  },
  info_corrected:{
      type: DataTypes.STRING
  },
  date_imprimé:{
      type: DataTypes.DATE
  },
  place_imprimé:{
      type: DataTypes.STRING
  },
  status_pro:{
      type: DataTypes.ENUM,
      values:[
          "civilian employee",
          "military employee",
          "civilian retiree",
          "military retiree",
          "unemployed",
          "without income"
      ]
  },
  is_biometrique:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
  },
  nin:{
      type: DataTypes.STRING,
      validate:{
          is:/^[0-9]/i
      }
  },
  cni_date:{
      type: DataTypes.DATE
  },
  nbr_act_naiss:{
      type: DataTypes.STRING,
      validate:{
          is:/^[0-9]/i
      }
  },
  date_act_naiss:{
      type: DataTypes.DATE
  },
  number_childs:{
      type: DataTypes.NUMBER
  },
  date_fiche_fam:{
      type: DataTypes.DATE
  },
  date_residence:{
      type: DataTypes.DATE
  },
  date_no_mariage:{
      type: DataTypes.DATE
  },
  date_depot:{
      type: DataTypes.DATE
  },
  number_depot:{
      type: DataTypes.STRING,
      validate:{
          is:/^[0-9]/i
      }
  },
  revenue_applicant:{
      type: DataTypes.STRING
  },
  revenue_conjoint:{
      type: DataTypes.STRING
  },
  revenue_both:{
      type: DataTypes.STRING
  },
  fonction_applicant:{
      type: DataTypes.STRING
  },
  fonction_conjoint:{
      type: DataTypes.STRING
  },
  }, {
    sequelize,
    modelName: 'Postulant',
  });
  return Postulant;
};