'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dossiers', {
      id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
    },
      date_reception: {
        type: Sequelize.DATE
      },
      num_bordoreau_arrive: {
        type: Sequelize.STRING
      },
      date_bordoreau_arrive: {
        type: Sequelize.DATE
      },
      num_accuse: {
        type: Sequelize.NUMBER
      },
      date_accuse: {
        type: Sequelize.DATE
      },
      status: Sequelize.STRING,
      postulant: {
        type:DataTypes.UUID,
        references:{
          model:"Postulant",
          key:"id"
        }
      },
      liste_id:{
        type:Sequelize.UUID,
        references:{
          model:"Liste",
          key:"id"
        }
      },
      revenue_postulant: Sequelize.STRING,
    revenue_conjoint: Sequelize.STRING,
    revenue : Sequelize.STRING,
    num_bordoreau_envoie:Sequelize.NUMBER,
    date_bordoreau_envoie: Sequelize.DATE,
    date_reception_des_reserve: Sequelize.DATE,
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
    await queryInterface.dropTable('Dossiers');
  }
};