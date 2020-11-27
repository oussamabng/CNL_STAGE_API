'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ControlRejets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
      },
      num_ctrl: {
        type: Sequelize.STRING
      },
      date_ctrl: {
        type: Sequelize.DATE
      },
      resultat_ctrl:{
        type: Sequelize.BOOLEAN
      },
      agent_ctrl: {
        type: Sequelize.UUID,
        references:{
          model:"Agent",
          key:"id"
        }
      },
      nature_ctrl: {
        type: Sequelize.ENUM,
        values:["nv","redressement","recours"]
      },
      date_resultat_ctrl: {
        type: Sequelize.DATE
      },
      rejet_ctrl: {
        type: Sequelize.BOOLEAN
      },
      agent_rejet: {
        type: Sequelize.UUID,
        references:{
          model:"Agent",
          key:"id"
        }
      },
      date_rejet: {
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
    await queryInterface.dropTable('ControlRejets');
  }
};