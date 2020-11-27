'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AffRejets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
      },
      num_aff: {
        type: Sequelize.STRING
      },
      date_aff: {
        type: Sequelize.DATE
      },
      agent_aff: {
        type: Sequelize.UUID,
        references:{
          model:"Agent",
          key:"id"
        }
      },
      caisse: {
        type: Sequelize.ENUM,
        values:["CASNOS","CNAS","CNR"]
      },
      resultat_aff: {
        type: Sequelize.BOOLEAN
      },
      date_resultat: {
        type: Sequelize.DATE
      },
      comformite: {
        type: Sequelize.BOOLEAN
      },
      agent_compf: {
        type: Sequelize.UUID,
        references:{
          model:"Agent",
          key:"id"
        }
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
    await queryInterface.dropTable('AffRejets');
  }
};