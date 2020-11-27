'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Agents', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
    //         key:"upid"
    //     }
    // },
    is_admin:{
        type: DataTypes.BOOLEAN
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
    await queryInterface.dropTable('Agents');
  }
};