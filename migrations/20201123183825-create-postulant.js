'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Postulants', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
    },
    n_liste:{
        type: Sequelize.STRING,
        validate:{
            is:/^[0-9]/i,
        }
    },
    date_verification:{
        type: Sequelize.DATE
    },
    agent_concerned:{
        type: Sequelize.UUID,
        references: {
            model:"agents",
            key:"agid"
        }
    },
    info_corrected:{
        type: Sequelize.STRING
    },
    date_imprimé:{
        type: Sequelize.DATE
    },
    place_imprimé:{
        type: Sequelize.STRING
    },
    status_pro:{
        type: Sequelize.ENUM,
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
        type: Sequelize.BOOLEAN,
        defaultValue:false
    },
    nin:{
        type: Sequelize.STRING,
        validate:{
            is:/^[0-9]/i
        }
    },
    resus:{
        type: Sequelize.STRING,
    },
    cni_date:{
        type: Sequelize.DATE
    },
    nbr_act_naiss:{
        type: Sequelize.STRING,
        validate:{
            is:/^[0-9]/i
        }
    },
    date_act_naiss:{
        type: Sequelize.DATE
    },
    number_childs:{
        type: Sequelize.NUMBER
    },
    date_fiche_fam:{
        type: Sequelize.DATE
    },
    date_residence:{
        type: Sequelize.DATE
    },
    date_no_mariage:{
        type: Sequelize.DATE
    },
    date_depot:{
        type: Sequelize.DATE
    },
    number_depot:{
        type: Sequelize.STRING,
        validate:{
            is:/^[0-9]/i
        }
    },
    revenue_applicant:{
        type: Sequelize.STRING
    },
    revenue_conjoint:{
        type: Sequelize.STRING
    },
    revenue_both:{
        type: Sequelize.STRING
    },
    fonction_applicant:{
        type: Sequelize.STRING
    },
    fonction_conjoint:{
        type: Sequelize.STRING
    },
    work_file_applicant:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
    work_file_conjoint:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
    payments_file_applicant:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
    payments_file_conjoint:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
    c20_file:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
    retiree_file:{
        type: Sequelize.BOOLEAN,
        allowNull:true
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Postulants');
  }
};