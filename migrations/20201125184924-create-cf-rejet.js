'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CfRejets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
      },
      num_cf: {
        type: Sequelize.STRING
      },
      date_cf: {
        type: Sequelize.DATE
      },
      agent_cf: {
        type: Sequelize.UUID,
        references:{
          model:"Agent",
          key:"id"
        }
      },
      resultat_cf: {
        type: Sequelize.BOOLEAN
      },
      date_resultat_cf: {
        type: Sequelize.DATE
      },
      rejet_cf: {
        type: Sequelize.BOOLEAN
      },
      agent_rejet_cf: {
        type: Sequelize.UUID,
        references:{
          model:"Agent",
          key:"id"
        }
      },
      date_rejet_cf: {
        type: Sequelize.DATE
      },
      dossierId:{
        type: Sequelize.UUID,
        onDelete:"CASCADE",
        references:{
          model:"Dossier",
          key:"id"
        }
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
    await queryInterface.dropTable('CfRejets');
  }
};